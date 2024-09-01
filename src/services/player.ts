import axios from '../axios';
import type { Pagination } from '../interfaces/api';
import { Device } from '../interfaces/devices';
import type { PlayHistoryObject } from '../interfaces/player';

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
  await axios.put('/me/player/play', body);
};

/**
 * @description Pause playback on the user's account. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 */
const pausePlayback = async () => {
  await axios.put('/me/player/pause');
};

/**
 * @description Skip to the next track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 */
const nextTrack = async () => {
  await axios.post('/me/player/next');
};

/**
 * @description Skip to the previous track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 */
const previousTrack = async () => {
  await axios.post('/me/player/previous');
};

/**
 * @description Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 */
const seekToPosition = async (position_ms: number) => {
  await axios.put('/me/player/seek', {}, { params: { position_ms } });
};

/**
 * @description Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 * @param state track, context, or off. track will repeat the current track. context will repeat the current context. off will turn repeat off.
 */
const setRepeatMode = async (state: 'track' | 'context' | 'off') => {
  await axios.put('/me/player/repeat', {}, { params: { state } });
};

/**
 * @description Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 * @param volume_percent The volume to set. Must be a value from 0 to 100 inclusive.
 */
const setVolume = async (volume_percent: number) => {
  await axios.put('/me/player/volume', {}, { params: { volume_percent } });
};

/**
 * @description Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 */
const toggleShuffle = async (state: boolean) => {
  await axios.put('/me/player/shuffle', {}, { params: { state } });
};

/**
 * @description Add an item to the end of the user's current playback queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.
 */
const addToQueue = async (uri: string) => {
  await axios.post('/me/player/queue', {}, { params: { uri } });
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
