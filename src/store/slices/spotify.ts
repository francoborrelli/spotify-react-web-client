import type { RootState } from '../store';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { playerService } from '../../services/player';
import { Device } from '../../interfaces/devices';

const initialState: {
  liked: boolean;
  deviceId: string | null;
  activeDevice: string | null;
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
};

export const setState = createAsyncThunk<
  [Spotify.PlaybackState | null, boolean],
  { state: Spotify.PlaybackState | null }
>('spotify/setState', async ({ state: spotifyState }, { getState }) => {
  if (!spotifyState) return [null, false];

  const state = getState() as RootState;
  const currentSong = state.spotify.state?.track_window.current_track;

  if (currentSong && currentSong.id === spotifyState.track_window.current_track.id)
    return [spotifyState, state.spotify.liked];

  const response = await userService.checkSavedTracks([
    spotifyState.track_window.current_track.id!,
  ]);
  return [spotifyState, response.data[0]];
});

export const setDeviceId = createAsyncThunk<string, string>('spotify/setDeviceId', async (id) => {
  return id;
});

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
    setPlayer(state, action: PayloadAction<{ player: Spotify.Player | null }>) {
      state.player = action.payload.player;
    },
    setActiveDevice(state, action: PayloadAction<{ activeDevice: string | null }>) {
      state.activeDevice = action.payload.activeDevice;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setState.fulfilled, (state, action) => {
      state.liked = action.payload[1];
      state.state = action.payload[0];
    });
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.devices = action.payload;
    });
  },
});

export const spotifyActions = { ...spotifySlice.actions, setState, fetchDevices, setDeviceId };

export default spotifySlice.reducer;
