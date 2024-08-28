import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { categoriesService } from '../../services/categories';

// Interfaces
import type { Category } from '../../interfaces/categories';

const initialState: {
  loading: boolean;
  categories: Category[];
} = {
  loading: true,
  categories: [],
};

export const fetchCategories = createAsyncThunk('browse/fetchCategories', async () => {
  const response = await categoriesService.fetchCategories({ limit: 50 });
  return response.data.categories.items;
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
