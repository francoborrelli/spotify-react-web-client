import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { playlistService } from '../../services/playlists';

// Interfaces
import type { RootState } from '../store';
import type { User } from '../../interfaces/user';
import type { Pagination } from '../../interfaces/api';
import type { Playlist, PlaylistItem, PlaylistItemWithSaved } from '../../interfaces/playlists';

const initialState: {
  user: User | null;
  tracks: PlaylistItemWithSaved[];
  playlist: Playlist | null;

  loading: boolean;
  canEdit: boolean;
  following: boolean;

  order: string;
  view: 'LIST' | 'COMPACT';
} = {
  user: null,
  tracks: [],
  playlist: null,

  loading: true,
  canEdit: false,
  following: false,

  order: 'ALL',
  view: 'LIST',
};

export const fetchPlaylist = createAsyncThunk<
  [Playlist, PlaylistItemWithSaved[], boolean, boolean, User],
  string
>('playlist/fetchPlaylist', async (id, { getState }) => {
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

  const extraPromises = [
    userService.getUser(playlist.owner!.id),
    userService.checkSavedTracks(items.map((item) => item.track.id)),
  ];

  const extraResponses = await Promise.all(extraPromises);

  const owner = extraResponses[0].data as User;
  const saved = extraResponses[1].data as boolean[];

  const canEdit = user?.id === owner?.id || playlist.collaborative;

  const itemsWithSave: PlaylistItemWithSaved[] = items.map((item, index) => ({
    ...item,
    saved: saved[index],
  }));

  return [playlist, itemsWithSave, following, canEdit, owner];
});

export const refreshTracks = createAsyncThunk<PlaylistItemWithSaved[], string>(
  'playlist/refreshTracks',
  async (id) => {
    const { data } = await playlistService.getPlaylistItems(id);
    const { data: saved } = await userService.checkSavedTracks(
      data.items.map((item) => item.track.id)
    );
    const itemsWithSave: PlaylistItemWithSaved[] = data.items.map((item, index) => ({
      ...item,
      saved: saved[index],
    }));

    return itemsWithSave;
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<{ playlist: Playlist | null }>) {
      state.playlist = action.payload.playlist;
      if (!action.payload.playlist) {
        state.tracks = [];
        state.following = false;
        state.canEdit = false;
        state.user = null;
        state.loading = true;
      }
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
      state.user = action.payload[4];
      state.loading = false;
    });
    builder.addCase(refreshTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
    });
  },
});

export const playlistActions = { fetchPlaylist, ...playlistSlice.actions, refreshTracks };

export default playlistSlice.reducer;
