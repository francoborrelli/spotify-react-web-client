import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { albumsService } from '../../services/albums';

// Interfaces
import type { Album } from '../../interfaces/albums';
import type { Pagination } from '../../interfaces/api';
import type { Track, TrackWithSave } from '../../interfaces/track';

const initialState: {
  album: Album | null;
  tracks: TrackWithSave[];

  loading: boolean;
  following: boolean;

  order: string;
  view: 'LIST' | 'COMPACT';
} = {
  tracks: [],
  album: null,

  loading: true,
  following: false,

  order: 'ALL',
  view: 'LIST',
};

export const fetchAlbum = createAsyncThunk<[Album, TrackWithSave[], boolean], string>(
  'album/fetchAlbum',
  async (id) => {
    const promises = [
      albumsService.fetchAlbum(id),
      albumsService.fetchAlbumTracks(id, { limit: 50 }),
      userService.checkFollowingArtists([id]),
    ];

    const responses = await Promise.all(promises);
    const playlist = responses[0].data as Album;
    const { items } = responses[1].data as Pagination<Track>;
    const [following] = responses[2].data as boolean[];

    const extraPromises = [userService.checkSavedTracks(items.map((item) => item.id))];

    const extraResponses = await Promise.all(extraPromises);
    const saved = extraResponses[0].data as boolean[];

    const itemsWithSave: TrackWithSave[] = items.map((item, index) => ({
      ...item,
      saved: saved[index],
    }));

    return [playlist, itemsWithSave, following];
  }
);

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbum(state, action: PayloadAction<{ album: Album | null }>) {
      state.album = action.payload.album;
      if (!action.payload.album) {
        state.tracks = [];
        state.following = false;
        state.loading = true;
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
      state.following = action.payload[2];
      state.loading = false;
    });
  },
});

export const albumActions = {
  fetchAlbum,
  ...albumSlice.actions,
};

export default albumSlice.reducer;
