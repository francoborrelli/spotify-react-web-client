import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';
import type { Track } from '../../interfaces/track';

type Item = Playlist | Album | Track | Artist;

const initialState: {
  items: Item[];
} = {
  items: [],
};

const searchHistoryActionsSlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<Item>) {
      state.items.unshift(action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
    removeItem(state, action: PayloadAction<Item>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const searchHistoryActions = {
  ...searchHistoryActionsSlice.actions,
};

export default searchHistoryActionsSlice.reducer;
