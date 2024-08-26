import type { RootState } from '../store';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';

const initialState: {
  liked: boolean;
  deviceId: string | null;
  activeDevice: string | null;
  state: Spotify.PlaybackState | null;
} = {
  state: null,
  deviceId: null,
  activeDevice: null,
  liked: false,
};

export const setState = createAsyncThunk<
  [Spotify.PlaybackState | null, boolean],
  { state: Spotify.PlaybackState | null }
>('queue/setState', async ({ state: spotifyState }, { getState }) => {
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

const spotifySlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setDeviceId(state, action: PayloadAction<{ deviceId: string | null }>) {
      state.deviceId = action.payload.deviceId;
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
  },
});

export const spotifyActions = { ...spotifySlice.actions, setState };

export default spotifySlice.reducer;
