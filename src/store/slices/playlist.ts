import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { playlistService } from '../../services/playlists';

// Interfaces
import type { RootState } from '../store';
import type { User } from '../../interfaces/user';
import type { Track } from '../../interfaces/track';
import type { Pagination } from '../../interfaces/api';
import type { Playlist, PlaylistItem, PlaylistItemWithSaved } from '../../interfaces/playlists';

const initialState: {
  user: User | null;
  recommedations: Track[];
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
  recommedations: [],

  loading: true,
  canEdit: false,
  following: false,

  order: 'ALL',
  view: 'LIST',
};

export const fetchPlaylist = createAsyncThunk<
  [Playlist, PlaylistItemWithSaved[], boolean, boolean, User, Track[]],
  string
>('playlist/fetchPlaylist', async (id, { getState }) => {
  const { auth } = getState() as RootState;
  const { user } = auth;

  const promises = [
    playlistService.getPlaylist(id),
    playlistService.getPlaylistItems(id),
    user ? userService.checkFollowedPlaylist(id) : Promise.resolve({ data: [false] }),
  ];

  const responses = await Promise.all(promises);
  const playlist = responses[0].data as Playlist;
  const { items } = responses[1].data as Pagination<PlaylistItem>;
  const [following] = responses[2].data as boolean[];

  const ids = items.map((item) => item.track.id);
  const artistsIds = items.map((item) => item.track.artists[0].id);

  const isMine = user?.id === playlist.owner?.id;
  const canEdit = isMine || playlist.collaborative;

  const extraPromises = [
    playlist.owner?.id ? userService.getUser(playlist.owner.id) : Promise.resolve({ data: null }),
    ids.length && user
      ? userService.checkSavedTracks(items.map((item) => item.track.id)).catch(() => ({ data: [] }))
      : Promise.resolve({ data: [] }),
    isMine
      ? ids.length
        ? playlistService
            .getRecommendations({
              seed_tracks: ids.slice(0, 5).join(',') || undefined,
              seed_artists: artistsIds.slice(0, 5).join(',') || undefined,
              limit: 25,
            })
            .then((res) => ({
              data: res.data.tracks,
            }))
            .catch(() => ({
              data: [],
            }))
        : userService.fetchTopTracks({ limit: 25, timeRange: 'short_term' }).then((res) => ({
            data: res.data.items,
          }))
      : Promise.resolve({ data: [] }),
  ];

  const extraResponses = await Promise.all(extraPromises);

  const owner = extraResponses[0].data as User;
  const saved = extraResponses[1].data as boolean[];
  const recommendations = extraResponses[2].data as Track[];

  const itemsWithSave: PlaylistItemWithSaved[] = items.map((item, index) => ({
    ...item,
    saved: saved[index],
  }));

  return [playlist, itemsWithSave, following, canEdit, owner, recommendations];
});

export const refreshTracks = createAsyncThunk<PlaylistItemWithSaved[], string>(
  'playlist/refreshTracks',
  async (id) => {
    try {
      const { data } = await playlistService.getPlaylistItems(id);
      const ids = data.items.map((item) => item.track.id);

      const { data: saved } = await (ids.length
        ? userService.checkSavedTracks(ids).catch(() => ({ data: [] }))
        : Promise.resolve({ data: [] }));

      const itemsWithSave: PlaylistItemWithSaved[] = data.items.map((item, index) => ({
        ...item,
        saved: saved[index],
      }));

      return itemsWithSave;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const getNextTracks = createAsyncThunk<PlaylistItemWithSaved[]>(
  'playlist/getNextTracks',
  async (_params, { getState }) => {
    const { playlist, tracks } = (getState() as RootState).playlist;

    const { data } = await playlistService.getPlaylistItems(playlist!.id, {
      offset: tracks.length,
      limit: 50,
    });

    const ids = data.items.map((item) => item.track.id);

    const { data: saved } = await (ids.length
      ? userService.checkSavedTracks(ids).catch(() => ({ data: [] }))
      : Promise.resolve({ data: [] }));

    const itemsWithSave: PlaylistItemWithSaved[] = data.items.map((item, index) => ({
      ...item,
      saved: saved[index],
    }));

    return itemsWithSave;
  }
);

export const refreshPlaylist = createAsyncThunk<Playlist, string>(
  'playlist/refreshPlaylist',
  async (id) => {
    const { data } = await playlistService.getPlaylist(id);
    return data;
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
        state.view = 'LIST';
      }
    },
    removeTrack(state, action: PayloadAction<{ id: string }>) {
      state.tracks = state.tracks.filter((track) => track.track.id !== action.payload.id);
    },
    setTrackLikeState(state, action: PayloadAction<{ id: string; saved: boolean }>) {
      state.tracks = state.tracks.map((track) =>
        track.track.id === action.payload.id ? { ...track, saved: action.payload.saved } : track
      );
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
    removeTrackFromRecommendations(state, action: PayloadAction<{ id: string }>) {
      state.recommedations = state.recommedations.filter((track) => track.id !== action.payload.id);
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
      state.recommedations = action.payload[5];
      state.loading = false;
    });
    builder.addCase(refreshTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
    });
    builder.addCase(refreshPlaylist.fulfilled, (state, action: PayloadAction<Playlist>) => {
      state.playlist = action.payload;
    });
    builder.addCase(getNextTracks.fulfilled, (state, action) => {
      state.tracks = [...state.tracks, ...action.payload];
    });
  },
});

export const playlistActions = {
  fetchPlaylist,
  refreshTracks,
  getNextTracks,
  refreshPlaylist,
  ...playlistSlice.actions,
};

export default playlistSlice.reducer;
