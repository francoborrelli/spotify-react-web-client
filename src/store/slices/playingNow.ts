import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { artistService } from '../../services/artist';

// Interfaces
import type { RootState } from '../store';
import type { Artist } from '../../interfaces/artist';

export interface PlayingNowState {
  artist: Artist | null;
}

const initialState: PlayingNowState = {
  artist: null,
};

export const fetchArtist = createAsyncThunk<Artist, string>(
  'playingNow/fetchArtist',
  async (id, { getState }) => {
    const state = getState() as RootState;
    if (state.playingNow.artist?.id === id) {
      return state.playingNow.artist;
    }
    const response = await artistService.fetchArtist(id);
    return response.data;
  }
);

const playingNowSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.artist = action.payload;
    });
  },
});

export const playingNowActions = {
  fetchArtist,
  ...playingNowSlice.actions,
};

export default playingNowSlice.reducer;
