import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  queueCollapsed: boolean;
  libraryCollapsed: boolean;
}

const initialState: UiState = {
  queueCollapsed: true,
  libraryCollapsed: window.innerWidth < 973,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    collapseLibrary(state) {
      state.libraryCollapsed = true;
    },
    toggleLibrary(state) {
      state.libraryCollapsed = !state.libraryCollapsed;
    },
    collapseQueue(state) {
      state.queueCollapsed = true;
    },
    toggleQueue(state) {
      state.queueCollapsed = !state.queueCollapsed;
    },
  },
});

export const uiActions = {
  ...uiSlice.actions,
};

export default uiSlice.reducer;
