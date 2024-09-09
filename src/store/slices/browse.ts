import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { categoriesService } from '../../services/categories';

// Interfaces
import type { Category } from '../../interfaces/categories';
import { RootState } from '../store';

const initialState: {
  loading: boolean;
  categories: Category[];
} = {
  loading: true,
  categories: [],
};

export const fetchCategories = createAsyncThunk('browse/fetchCategories', async (_, api) => {
  const user = (api.getState() as RootState).auth.user;
  const response = await categoriesService.fetchCategories({ limit: 50 });
  const items = response.data.categories.items;
  return user ? items : items.filter((item) => item.id);
});

const browseSlice = createSlice({
  name: 'browse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload as any as any[];
    });
  },
});

export const browseActions = {
  ...browseSlice.actions,
  fetchCategories,
};

export default browseSlice.reducer;
