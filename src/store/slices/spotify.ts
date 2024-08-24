import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { state: Spotify.PlaybackState | null; activeDevice: string | null } = {
  state: null,
  activeDevice: null,
};

const spotifySlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<{ state: Spotify.PlaybackState | null }>) {
      state.state = action.payload.state;
    },
    setActiveDevice(state, action: PayloadAction<{ activeDevice: string | null }>) {
      state.activeDevice = action.payload.activeDevice;
    },
  },
});

export const spotifyActions = { ...spotifySlice.actions };

export default spotifySlice.reducer;
