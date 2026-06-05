import axios from '../axios';
import type { Pagination } from '../interfaces/api';
import { Device } from '../interfaces/devices';
import type { PlayHistoryObject } from '../interfaces/player';

// The device playback commands should target — the Web Playback SDK device by default, or
// whatever device the user explicitly transfers to. Sending `device_id` on `play` means we
// don't depend on Spotify already having an "active device", which avoids the 404
// "Device not found" (its message for "no active device" too). Persist to localStorage so the
// id survives dev-server hot-reloads, where the SDK's `ready` event won't fire again.
const DEVICE_STORAGE_KEY = 'playback_device_id';
let playbackDeviceId: string | null = null;
// Name of our Web Playback SDK device, used to re-resolve its id from the live devices list.
// The SDK assigns a NEW device_id on every (re)connect, so a cached id goes stale — matching
// by name is the reliable way to find the current device.
let playbackDeviceName: string | null = null;

export const setPlaybackDevice = (deviceId: string | null) => {
  playbackDeviceId = deviceId;
  try {
    if (deviceId) localStorage.setItem(DEVICE_STORAGE_KEY, deviceId);
  } catch {
    /* ignore storage errors */
  }
};

export const setPlaybackDeviceName = (name: string | null) => {
  playbackDeviceName = name;
};

const currentDeviceId = () => {
  if (playbackDeviceId) return playbackDeviceId;
  try {
    return localStorage.getItem(DEVICE_STORAGE_KEY);
  } catch {
    return null;
  }
};

const deviceParams = () => {
  const id = currentDeviceId();
  return id ? { device_id: id } : undefined;
};

// Resolve the current, live id of our SDK device from `/me/player/devices`, matching by name
// (falling back to the cached id). Updates the cache so subsequent calls hit the fast path.
const resolveLiveDeviceId = async (): Promise<string | null> => {
  try {
    const { data } = await axios.get<{ devices: Device[] }>('/me/player/devices');
    const match =
      (playbackDeviceName && data.devices.find((d) => d.name === playbackDeviceName)) ||
      data.devices.find((d) => d.id === currentDeviceId());
    if (match?.id) {
      setPlaybackDevice(match.id);
      return match.id;
    }
  } catch {
    /* ignore — fall back to the cached id below */
  }
  return currentDeviceId();
};

/**
 * @description Get information about the user’s current playback state, including track or episode, progress, and active device.
 */
const fetchPlaybackState = async () => {
  const response = await axios.get('/me/player');
  return response.data;
};

/**
 *
 * @description Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 * @param deviceId The ID of the device this command is targeting. If not supplied, the user’s currently active device is the target.
 */
const transferPlayback = async (deviceId: string) => {
  // Remember the target before the request: even if this transfer 404s due to the
  // registration race, subsequent `startPlayback` calls carry `device_id` and recover.
  setPlaybackDevice(deviceId);
  await axios.put('/me/player', { device_ids: [deviceId] });
};

/**
 * @description Get information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.
 */
const getAvailableDevices = async () => {
  const response = await axios.get<{ devices: Device[] }>('/me/player/devices');
  return response.data;
};

/**
 * @description Start a new context or resume current playback on the user's active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 */
const startPlayback = async (
  body: { context_uri?: string; uris?: string[]; offset?: { position: number } } = {}
) => {
  try {
    await axios.put('/me/player/play', body, { params: deviceParams() });
  } catch (e: any) {
    // "Device not found" means the cached id is stale (the SDK reconnected with a new id) or
    // our device isn't active yet. Re-resolve the live device by name, transfer, and retry.
    if (e?.response?.status !== 404) throw e;
    const id = await resolveLiveDeviceId();
    if (!id) throw e;
    await axios.put('/me/player', { device_ids: [id] }).catch(() => {});
    await new Promise((resolve) => setTimeout(resolve, 700));
    await axios.put('/me/player/play', body, { params: { device_id: id } });
  }
};

// Fire-and-forget transport command. Targets our SDK device (so it doesn't depend on a
// pre-existing "active device") and never throws on a transient failure — e.g. a stray
// `onChangeEnd` fired during a React StrictMode unmount, or no active device yet. This keeps a
// failed control call from surfacing as an uncaught 404 in the UI.
const playerCommand = async (
  method: 'put' | 'post',
  url: string,
  params?: Record<string, string | number | boolean>
) => {
  try {
    await axios[method](url, {}, { params: { ...deviceParams(), ...params } });
  } catch (e) {
    console.warn(`Spotify player command failed: ${method.toUpperCase()} ${url}`, e);
  }
};

/**
 * @description Pause playback on the user's account. This API only works for users who have Spotify Premium.
 */
const pausePlayback = async () => {
  await playerCommand('put', '/me/player/pause');
};

/**
 * @description Skip to the next track in the user’s queue. This API only works for users who have Spotify Premium.
 */
const nextTrack = async () => {
  await playerCommand('post', '/me/player/next');
};

/**
 * @description Skip to the previous track in the user’s queue. This API only works for users who have Spotify Premium.
 */
const previousTrack = async () => {
  await playerCommand('post', '/me/player/previous');
};

/**
 * @description Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium.
 */
const seekToPosition = async (position_ms: number) => {
  await playerCommand('put', '/me/player/seek', { position_ms });
};

/**
 * @description Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium.
 * @param state track, context, or off. track will repeat the current track. context will repeat the current context. off will turn repeat off.
 */
const setRepeatMode = async (state: 'track' | 'context' | 'off') => {
  await playerCommand('put', '/me/player/repeat', { state });
};

/**
 * @description Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium.
 * @param volume_percent The volume to set. Must be a value from 0 to 100 inclusive.
 */
const setVolume = async (volume_percent: number) => {
  await playerCommand('put', '/me/player/volume', { volume_percent });
};

/**
 * @description Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium.
 */
const toggleShuffle = async (state: boolean) => {
  await playerCommand('put', '/me/player/shuffle', { state });
};

/**
 * @description Add an item to the end of the user's current playback queue. This API only works for users who have Spotify Premium.
 */
const addToQueue = async (uri: string) => {
  await playerCommand('post', '/me/player/queue', { uri });
};

/**
 * @description Get tracks from the current user's recently played tracks. Note: Currently doesn't support podcast episodes.
 */
const getRecentlyPlayed = async (params: { limit?: number; after?: number; before?: number }) => {
  const response = await axios.get<Pagination<PlayHistoryObject>>('/me/player/recently-played', {
    params,
  });
  return response.data;
};

export const playerService = {
  addToQueue,
  setPlaybackDevice,
  setPlaybackDeviceName,
  fetchPlaybackState,
  transferPlayback,
  startPlayback,
  pausePlayback,
  nextTrack,
  previousTrack,
  setRepeatMode,
  setVolume,
  toggleShuffle,
  seekToPosition,
  getRecentlyPlayed,
  getAvailableDevices,
};
