import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

// Interfaces
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';
import { RootState } from '../store';

export interface YourLibraryState {
  myAlbums: Album[];
  myArtists: Artist[];
  myPlaylists: Playlist[];

  search: string;
  orderBy: 'name' | 'added_at' | 'default';
  filter: 'ALL' | 'ALBUMS' | 'ARTISTS' | 'PLAYLISTS';
}

const initialState: YourLibraryState = {
  search: '',
  myAlbums: [],
  filter: 'ALL',
  myArtists: [],
  myPlaylists: [],
  orderBy: 'default',
};

export const fetchMyPlaylists = createAsyncThunk('yourLibrary/fetchMyPlaylists', async () => {
  const response = await playlistService.getMyPlaylists({ limit: 50 });
  return response.data.items;
});

export const fetchMyAlbums = createAsyncThunk('yourLibrary/fetchTopTracks', async () => {
  const response = await albumsService.fetchSavedAlbums({ limit: 50 });
  return response.data.items.map((item) => item.album);
});

export const fetchMyArtists = createAsyncThunk('yourLibrary/fetchMyArtists', async () => {
  const response = await userService.fetchFollowedArtists({ limit: 50 });
  return response.data.artists.items;
});

const yourLibrarySlice = createSlice({
  name: 'yourLibrary',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{ filter: YourLibraryState['filter'] }>) {
      state.filter = action.payload.filter;
    },
    setSearch(state, action: PayloadAction<{ search: string }>) {
      state.search = action.payload.search;
    },
    setOrderBy(state, action: PayloadAction<{ orderBy: YourLibraryState['orderBy'] }>) {
      state.orderBy = action.payload.orderBy;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyPlaylists.fulfilled, (state, action) => {
      state.myPlaylists = action.payload;
    });
    builder.addCase(fetchMyAlbums.fulfilled, (state, action) => {
      state.myAlbums = action.payload;
    });
    builder.addCase(fetchMyArtists.fulfilled, (state, action) => {
      state.myArtists = action.payload;
    });
  },
});

export const getLibraryItems = (state: { yourLibrary: typeof initialState }) => {
  if (state.yourLibrary.filter === 'ALBUMS') return state.yourLibrary.myAlbums;
  if (state.yourLibrary.filter === 'ARTISTS') return state.yourLibrary.myArtists;
  if (state.yourLibrary.filter === 'PLAYLISTS') return state.yourLibrary.myPlaylists;

  return [
    state.yourLibrary.myPlaylists.slice(0, 3),
    state.yourLibrary.myAlbums.slice(0, 2),
    state.yourLibrary.myPlaylists.slice(3, 6),
    state.yourLibrary.myArtists.slice(0, 1),
    state.yourLibrary.myAlbums.slice(2, 5),
    state.yourLibrary.myArtists.slice(1, 2),
    state.yourLibrary.myPlaylists.slice(6, 10),
    state.yourLibrary.myAlbums.slice(5, 9),
    state.yourLibrary.myArtists.slice(2, 6),
    state.yourLibrary.myPlaylists.slice(10, 15),
    state.yourLibrary.myAlbums.slice(9, 13),
    state.yourLibrary.myArtists.slice(6, 10),
    state.yourLibrary.myPlaylists.slice(15, 20),
    state.yourLibrary.myAlbums.slice(13, 17),
    state.yourLibrary.myArtists.slice(10, 14),
    state.yourLibrary.myPlaylists.slice(20, 25),
    state.yourLibrary.myAlbums.slice(17, 21),
    state.yourLibrary.myArtists.slice(14, 18),
    state.yourLibrary.myPlaylists.slice(25, 30),
    state.yourLibrary.myAlbums.slice(21, 25),
    state.yourLibrary.myArtists.slice(18, 22),
    state.yourLibrary.myPlaylists.slice(30, 35),
    state.yourLibrary.myAlbums.slice(25, 43),
  ]
    .filter((r) => r)
    .flat();
};

export const getUserPlaylists = (state: RootState) => {
  const user = state.auth.user;
  return state.yourLibrary.myPlaylists.filter((playlist) => playlist.owner?.id === user?.id);
};

export const yourLibraryActions = {
  fetchMyAlbums,
  fetchMyArtists,
  fetchMyPlaylists,
  ...yourLibrarySlice.actions,
};

export default yourLibrarySlice.reducer;
