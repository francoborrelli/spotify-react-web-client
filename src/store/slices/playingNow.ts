import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { artistService } from '../../services/artist';

// Interfaces
import type { RootState } from '../store';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';
import type { AlbumFullObject } from '../../interfaces/albums';

// Service
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

export interface PlayingNowState {
  artist: Artist | null;
  playlist: Playlist | null;
  album: AlbumFullObject | null;
}

const initialState: PlayingNowState = {
  artist: null,
  album: null,
  playlist: null,
};

export const fetchArtist = createAsyncThunk<Artist, string>(
  'playingNow/fetchArtist',
  async (id, { getState }) => {
    const state = getState() as RootState;
    if (state.playingNow.artist?.id === id) {
      return state.playingNow.artist;
    }
    const response = await artistService.fetchArtist(id);
    return response.data;
  }
);

export const fetchPlaylist = createAsyncThunk<Playlist, string>(
  'playingNow/fetchPlaylist',
  async (id, { getState }) => {
    const state = getState() as RootState;
    if (state.playingNow.playlist?.id === id) {
      return state.playingNow.playlist;
    }
    const response = await playlistService.getPlaylist(id);
    return response.data;
  }
);

export const fetchAlbum = createAsyncThunk<AlbumFullObject, string>(
  'playingNow/fetchAlbum',
  async (id, { getState }) => {
    const state = getState() as RootState;
    if (state.playingNow.album?.id === id) {
      return state.playingNow.album;
    }
    const response = await albumsService.fetchAlbum(id);
    return response.data;
  }
);

const playingNowSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.artist = action.payload;
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload;
      state.album = null;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.album = action.payload;
      state.playlist = null;
    });
  },
});

export const playingNowActions = {
  fetchAlbum,
  fetchArtist,
  fetchPlaylist,
  ...playingNowSlice.actions,
};

export default playingNowSlice.reducer;
