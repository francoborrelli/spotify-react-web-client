import type { RootState } from '../store';

import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { playerService } from '../../services/player';
import { Device } from '../../interfaces/devices';

const initialState: {
  liked: boolean;
  deviceId: string | null;
  activeDevice: string | null;
  activeDeviceType: Device['type'];
  state: Spotify.PlaybackState | null;
  player: Spotify.Player | null;
  devices: Device[];
} = {
  state: null,
  deviceId: null,
  activeDevice: null,
  liked: false,
  player: null,
  devices: [],
  activeDeviceType: 'Computer',
};

export const setState = createAsyncThunk<
  Spotify.PlaybackState | null,
  { state: Spotify.PlaybackState | null }
>('spotify/setState', async ({ state: spotifyState }, { getState, dispatch }) => {
  if (!spotifyState) return null;
  const state = getState() as RootState;
  const currentSong = spotifyState?.track_window.current_track;

  if (currentSong?.id !== state.spotify.state?.track_window.current_track.id) {
    const playing = !spotifyState.paused;
    const song = spotifyState.track_window.current_track;
    document.title =
      song && playing ? `${song.name} • ${song.artists[0].name}` : 'Spotify Web Player';
    if (currentSong) dispatch(fetchLikedSong(currentSong.id!));
  }
  return spotifyState;
});

export const fetchLikedSong = createAsyncThunk<boolean, string>(
  'spotify/fetchLikedSong',
  async (id) => {
    const liked = await userService.checkSavedTracks([id!]);
    return liked.data[0];
  }
);

export const fetchDevices = createAsyncThunk<Device[]>('spotify/fetchDevices', async () => {
  const response = await playerService.getAvailableDevices();
  return response.devices;
});

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setLiked(state, action: PayloadAction<{ liked: boolean }>) {
      state.liked = action.payload.liked;
    },
    setDeviceId(state, action: PayloadAction<{ deviceId: string | null }>) {
      state.deviceId = action.payload.deviceId;
    },
    setPlayer(state, action: PayloadAction<{ player: Spotify.Player | null }>) {
      state.player = action.payload.player;
    },
    setActiveDevice(
      state,
      action: PayloadAction<{ activeDevice: string | null; type?: Device['type'] }>
    ) {
      state.activeDevice = action.payload.activeDevice;
      state.activeDeviceType = action.payload.type || 'Computer';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setState.fulfilled, (state, action) => {
      state.state = action.payload;
    });
    builder.addCase(fetchLikedSong.fulfilled, (state, action) => {
      state.liked = action.payload;
    });
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.devices = action.payload;
    });
  },
});

export const getCurrentDevice = createSelector(
  [(state: RootState) => state.spotify.devices],
  (devices) => {
    return devices.find((device) => device.is_active);
  }
);

export const isActiveOnOtherDevice = createSelector(
  [(state: RootState) => state.spotify.deviceId, (state: RootState) => state.spotify.activeDevice],
  (deviceId, activeDeviceId) => {
    return deviceId && activeDeviceId && deviceId !== activeDeviceId;
  }
);

export const getOtherDevices = createSelector(
  [(state: RootState) => state.spotify.devices],
  (devices) => {
    return devices.filter((device) => !device.is_active);
  }
);

export const spotifyActions = { ...spotifySlice.actions, setState, fetchDevices };

export default spotifySlice.reducer;
