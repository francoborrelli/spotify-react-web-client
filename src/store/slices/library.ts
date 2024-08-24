import { createSlice } from '@reduxjs/toolkit';

import type { Song } from '../../interfaces/types';

interface LibraryState {
  songPlaying: null | Song;

  queue: boolean;
  collapsed: boolean;
  detailsOpen: boolean;
}

const initialState: LibraryState = {
  queue: false,
  collapsed: window.innerWidth < 973,
  songPlaying: null,
  detailsOpen: false,
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    collapseLibrary(state) {
      state.collapsed = true;
    },
    toggleLibrary(state) {
      state.collapsed = !state.collapsed;
    },
    setSongPlaying(state, action) {
      state.songPlaying = action.payload;
      state.detailsOpen = true;
      state.queue = false;
    },
    toggleSongPlaying(state) {
      if (state.queue) {
        state.queue = false;
      } else {
        state.detailsOpen = !state.detailsOpen;
      }
    },
    removeSongPlaying(state) {
      state.detailsOpen = false;
      state.songPlaying = null;
      state.queue = false;
    },
    openQueue(state) {
      state.queue = true;
      state.detailsOpen = true;
    },
    closeQueue(state) {
      state.queue = false;
      state.detailsOpen = false;
    },
  },
});

export const libraryActions = librarySlice.actions;

export default librarySlice.reducer;
