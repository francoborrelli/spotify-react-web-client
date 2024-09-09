import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UiState {
  queueCollapsed: boolean;
  devicesCollapsed: boolean;
  detailsCollapsed: boolean;
  libraryCollapsed: boolean;
  loginTooltipOpen: boolean;
  loginModalOpen: boolean;
  loginButtonOpen: boolean;
}

const initialState: UiState = {
  queueCollapsed: true,
  loginModalOpen: false,
  devicesCollapsed: true,
  detailsCollapsed: true,
  libraryCollapsed: true,
  loginTooltipOpen: false,
  loginButtonOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openLoginButton(state) {
      state.loginButtonOpen = true;
      state.loginModalOpen = false;
      state.loginTooltipOpen = false;
    },
    closeLoginButton(state) {
      state.loginButtonOpen = false;
    },
    openLoginModal(state) {
      state.loginModalOpen = true;
      state.loginButtonOpen = false;
      state.loginTooltipOpen = false;
    },
    closeLoginModal(state) {
      state.loginModalOpen = false;
    },
    openLoginTooltip(state) {
      state.loginTooltipOpen = true;
      state.loginModalOpen = false;
      state.loginButtonOpen = false;
    },
    closeLoginTooltip(state) {
      state.loginTooltipOpen = false;
    },
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

export const getLibraryCollapsed = createSelector(
  [(state: RootState) => state.ui.libraryCollapsed, (state: RootState) => state.auth.user],
  (libraryCollapsed, user) => {
    return !user ? false : libraryCollapsed;
  }
);

export const uiActions = {
  ...uiSlice.actions,
};

export default uiSlice.reducer;
