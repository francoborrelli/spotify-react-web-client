import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { playlistService } from '../../services/playlists';

import type { Playlist, PlaylistItem } from '../../interfaces/playlists';
import { userService } from '../../services/users';
import { Pagination } from '../../interfaces/api';
import { RootState } from '../store';

const initialState: {
  order: string;
  loading: boolean;
  following: boolean;
  tracks: PlaylistItem[];
  playlist: Playlist | null;
  view: 'LIST' | 'COMPACT';
  canEdit: boolean;
} = {
  tracks: [],
  order: 'ALL',
  loading: true,
  playlist: null,
  following: false,
  view: 'LIST',
  canEdit: false,
};

export const fetchPlaylist = createAsyncThunk<[Playlist, PlaylistItem[], boolean, boolean], string>(
  'playlist/fetchPlaylist',
  async (id, { getState }) => {
    const { auth } = getState() as RootState;
    const { user } = auth;

    const promises = [
      playlistService.getPlaylist(id),
      playlistService.getPlaylistItems(id),
      userService.checkFollowedPlaylist(id),
    ];

    const responses = await Promise.all(promises);
    const playlist = responses[0].data as Playlist;
    const { items } = responses[1].data as Pagination<PlaylistItem>;
    const [following] = responses[2].data as boolean[];

    const canEdit = user?.id === playlist.owner?.id || playlist.collaborative;

    return [playlist, items, following, canEdit];
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<{ playlist: Playlist | null }>) {
      state.playlist = action.payload.playlist;
      state.loading = true;
      state.view = 'LIST';
    },
    setView(state, action: PayloadAction<{ view: 'LIST' | 'COMPACT' }>) {
      state.view = action.payload.view;
    },
    setOrder(state, action: PayloadAction<{ order: string }>) {
      state.order = action.payload.order;
    },
    reorderTracks(state, action: PayloadAction<{ from: number; to: number }>) {
      const tracks = [...state.tracks];
      const [track] = tracks.splice(action.payload.from, 1);
      tracks.splice(action.payload.to, 0, track);
      state.tracks = tracks;
    },
    resetOrder(state, action: PayloadAction<{ order?: string }>) {
      state.order = action.payload.order || 'ALL';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload[0];
      state.tracks = action.payload[1];
      state.following = action.payload[2];
      state.canEdit = action.payload[3];
      state.loading = false;
    });
  },
});

export const playlistActions = { fetchPlaylist, ...playlistSlice.actions };

export default playlistSlice.reducer;
