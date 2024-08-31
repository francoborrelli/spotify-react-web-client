import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces

import type { PlaylistItem } from '../../interfaces/playlists';

// Constants
import { userService } from '../../services/users';
import { RootState } from '../store';

const initialState: {
  total: number;
  items: PlaylistItem[];
} = {
  total: 0,
  items: [],
};

export const fetchLikeSongs = createAsyncThunk<[PlaylistItem[], number]>(
  'likedSongs/fetchLikeSongs',
  async () => {
    const response = await userService.getSavedTracks({ limit: 50 });
    return [response.data.items, response.data.total];
  }
);

export const fetchMore = createAsyncThunk<PlaylistItem[]>(
  'likedSongs/fetchMore',
  async (_, api) => {
    const {
      likedSongs: { items },
    } = api.getState() as RootState;
    const response = await userService.getSavedTracks({ limit: 50, offset: items.length });
    return response.data.items;
  }
);

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState,
  reducers: {
    removeSong: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.track.id !== action.payload.id);
      state.total -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLikeSongs.fulfilled, (state, action) => {
      state.items = action.payload[0];
      state.total = action.payload[1];
    });
    builder.addCase(fetchMore.fulfilled, (state, action) => {
      state.items.push(...action.payload);
    });
  },
});

export const likedSongsActions = {
  ...likedSongsSlice.actions,
  fetchLikeSongs,
  fetchMore,
};

export default likedSongsSlice.reducer;
