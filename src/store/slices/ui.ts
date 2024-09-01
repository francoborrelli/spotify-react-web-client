import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UiState {
  queueCollapsed: boolean;
  devicesCollapsed: boolean;
  detailsCollapsed: boolean;
  libraryCollapsed: boolean;
}

const initialState: UiState = {
  queueCollapsed: true,
  devicesCollapsed: true,
  detailsCollapsed: true,
  libraryCollapsed: true,
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
      state.devicesCollapsed = true;
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
      state.devicesCollapsed = true;
      state.queueCollapsed = !state.queueCollapsed;
    },
    collapseDevices(state) {
      state.devicesCollapsed = true;
    },
    toggleDevices(state) {
      state.detailsCollapsed = true;
      state.libraryCollapsed = true;
      state.queueCollapsed = true;
      state.devicesCollapsed = !state.devicesCollapsed;
    },
  },
});

export const isRightLayoutOpen = createSelector(
  [
    (state: RootState) => state.ui.queueCollapsed,
    (state: RootState) => state.ui.devicesCollapsed,
    (state: RootState) => state.ui.detailsCollapsed,
  ],
  (queueCollapsed, devicesCollapsed, detailsCollapsed) => {
    return !queueCollapsed || !devicesCollapsed || !detailsCollapsed;
  }
);

export const uiActions = {
  ...uiSlice.actions,
};

export default uiSlice.reducer;
