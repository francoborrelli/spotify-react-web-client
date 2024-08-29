import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  queueCollapsed: boolean;
  detailsCollapsed: boolean;
  libraryCollapsed: boolean;
}

const initialState: UiState = {
  queueCollapsed: true,
  detailsCollapsed: true,
  libraryCollapsed: window.innerWidth < 973,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    collapseDetails(state) {
      state.detailsCollapsed = true;
    },
    toggleDetails(state) {
      state.queueCollapsed = true;
      state.libraryCollapsed = true;
      state.detailsCollapsed = !state.detailsCollapsed;
    },
    collapseLibrary(state) {
      state.libraryCollapsed = true;
    },
    openLibrary(state) {
      state.libraryCollapsed = false;
    },
    toggleLibrary(state) {
      state.libraryCollapsed = !state.libraryCollapsed;
    },
    collapseQueue(state) {
      state.queueCollapsed = true;
    },
    toggleQueue(state) {
      state.detailsCollapsed = true;
      state.libraryCollapsed = true;
      state.queueCollapsed = !state.queueCollapsed;
    },
  },
});

export const uiActions = {
  ...uiSlice.actions,
};

export default uiSlice.reducer;
