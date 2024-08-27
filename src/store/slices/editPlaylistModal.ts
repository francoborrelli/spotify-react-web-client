import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Playlist } from '../../interfaces/playlists';

const initialState: { playlist: Playlist | null } = {
  playlist: null,
};

const editPlaylistModalSlice = createSlice({
  name: 'editPlaylistModal',
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<{ playlist: Playlist | null }>) {
      state.playlist = action.payload.playlist;
    },
  },
});

export const editPlaylistModalActions = editPlaylistModalSlice.actions;

export default editPlaylistModalSlice.reducer;
