import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  deviceId: string | null;
  activeDevice: string | null;
  state: Spotify.PlaybackState | null;
} = {
  state: null,
  deviceId: null,
  activeDevice: null,
};

const spotifySlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<{ state: Spotify.PlaybackState | null }>) {
      state.state = action.payload.state;
    },
    setDeviceId(state, action: PayloadAction<{ deviceId: string | null }>) {
      state.deviceId = action.payload.deviceId;
    },
    setActiveDevice(state, action: PayloadAction<{ activeDevice: string | null }>) {
      state.activeDevice = action.payload.activeDevice;
    },
  },
});

export const spotifyActions = { ...spotifySlice.actions };

export default spotifySlice.reducer;
