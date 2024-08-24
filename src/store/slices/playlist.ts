import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { order: string } = {
  order: 'ALL',
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<{ order: string }>) {
      state.order = action.payload.order;
    },
    resetOrder(state, action: PayloadAction<{ order?: string }>) {
      state.order = action.payload.order || 'ALL';
    },
  },
});

export const playlistActions = playlistSlice.actions;

export default playlistSlice.reducer;
