import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { categoriesService } from '../../services/categories';

// Interfaces
import type { Pagination } from '../../interfaces/api';
import type { Playlist } from '../../interfaces/playlists';
import type { Category } from '../../interfaces/categories';

const initialState: {
  category: Category | null;
  playlists: Playlist[];
  loading: boolean;
} = {
  category: null,
  playlists: [],
  loading: true,
};

export const fetchGenre = createAsyncThunk<[Category, Playlist[]], string>(
  'genre/fetchGenre',
  async (id) => {
    const promises = [
      categoriesService.fetchCategory(id),
      categoriesService.fetchCategoryPlaylists(id, { limit: 50 }),
    ];

    const responses = await Promise.all(promises);
    const category = responses[0].data as Category;
    const {
      playlists: { items },
    } = responses[1].data as unknown as { playlists: Pagination<Playlist> };

    return [category, items];
  }
);

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenre.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGenre.fulfilled, (state, action) => {
      state.category = action.payload[0];
      state.playlists = action.payload[1];
      state.loading = false;
    });
  },
});

export const genreActions = {
  fetchGenre,
  ...genreSlice.actions,
};

export default genreSlice.reducer;
