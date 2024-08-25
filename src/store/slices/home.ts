import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { albumsService } from '../../services/albums';

// Interfaces
import type { Track } from '../../interfaces/track';
import type { Album } from '../../interfaces/albums';

const initialState: { newReleases: Album[]; topTracks: Track[] } = {
  topTracks: [],
  newReleases: [],
};

export const fetchNewReleases = createAsyncThunk('home/fetchNewReleases', async () => {
  const response = await albumsService.fetchNewRelases({ limit: 10 });
  return response.data.albums.items;
});

export const fetchTopTracks = createAsyncThunk('home/fetchTopTracks', async () => {
  const response = await userService.fetchTopTracks({ limit: 8, timeRange: 'short_term' });
  return response.data.items;
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewReleases.fulfilled, (state, action) => {
      state.newReleases = action.payload as any as any[];
    });
    builder.addCase(fetchTopTracks.fulfilled, (state, action) => {
      state.topTracks = action.payload;
    });
  },
});

export const homeActions = { ...homeSlice.actions, fetchNewReleases, fetchTopTracks };

export default homeSlice.reducer;
