import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { albumsService } from '../../services/albums';
import { artistService } from '../../services/artist';

// Interfaces
import type { Album, AlbumFullObject } from '../../interfaces/albums';
import type { Pagination } from '../../interfaces/api';
import type { Artist } from '../../interfaces/artist';
import type { Track, TrackWithSave } from '../../interfaces/track';
import { RootState } from '../store';

const initialState: {
  artist: Artist | null;
  tracks: TrackWithSave[];
  album: AlbumFullObject | null;

  otherAlbums: Album[];

  loading: boolean;
  following: boolean;

  order: string;
  view: 'LIST' | 'COMPACT';
} = {
  tracks: [],
  album: null,
  artist: null,
  otherAlbums: [],

  loading: true,
  following: false,

  order: 'ALL',
  view: 'LIST',
};

export const fetchAlbum = createAsyncThunk<
  [AlbumFullObject, TrackWithSave[], boolean, Artist, Album[]],
  string
>('album/fetchAlbum', async (id, params) => {
  const state = params.getState() as RootState;
  const user = state.auth.user;

  const promises = [
    albumsService.fetchAlbum(id),
    albumsService.fetchAlbumTracks(id, { limit: 50 }),
    user ? userService.checkFollowingArtists([id]) : Promise.resolve({ data: [false] }),
  ];

  const responses = await Promise.all(promises);
  const album = responses[0].data as AlbumFullObject;
  const { items } = responses[1].data as Pagination<Track>;
  const [following] = responses[2].data as boolean[];

  const extraPromises = [
    userService.checkSavedTracks(items.map((item) => item.id)),
    artistService.fetchArtist(album.artists[0].id),
    artistService.fetchArtistAlbums(album.artists[0].id, { limit: 10 }),
  ];

  const extraResponses = await Promise.all(extraPromises);
  const saved = extraResponses[0].data as boolean[];
  const artist = extraResponses[1].data as Artist;
  const albums = (extraResponses[2].data as any).items as Album[];

  const itemsWithSave: TrackWithSave[] = items.map((item, index) => ({
    ...item,
    saved: saved[index],
  }));

  return [album, itemsWithSave, following, artist, albums];
});

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setFollowing(state, action: PayloadAction<{ following: boolean }>) {
      state.following = action.payload.following;
    },
    setAlbum(state, action: PayloadAction<{ album: AlbumFullObject | null }>) {
      state.album = action.payload.album;
      if (!action.payload.album) {
        state.tracks = [];
        state.following = false;
        state.loading = true;
        state.artist = null;
        state.view = 'LIST';
      }
    },
    setView(state, action: PayloadAction<{ view: 'LIST' | 'COMPACT' }>) {
      state.view = action.payload.view;
    },
    setOrder(state, action: PayloadAction<{ order: string }>) {
      state.order = action.payload.order;
    },
    updateTrackLikeState(state, action: PayloadAction<{ id: string; saved: boolean }>) {
      const index = state.tracks.findIndex((track) => track.id === action.payload.id);
      if (index !== -1) {
        state.tracks[index].saved = action.payload.saved;
      }
    },
    resetOrder(state, action: PayloadAction<{ order?: string }>) {
      state.order = action.payload.order || 'ALL';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.album = action.payload[0];
      state.tracks = action.payload[1];
      state.artist = action.payload[3];
      state.following = action.payload[2];
      state.otherAlbums = action.payload[4];
      state.loading = false;
    });
  },
});

export const albumActions = {
  fetchAlbum,
  ...albumSlice.actions,
};

export default albumSlice.reducer;
