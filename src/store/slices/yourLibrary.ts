import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

// Interfaces
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';

interface YourLibraryState {
  collapsed: boolean;
  myAlbums: Album[];
  myArtists: Artist[];
  myPlaylists: Playlist[];
}

const initialState: YourLibraryState = {
  myAlbums: [],
  myArtists: [],
  myPlaylists: [],
  collapsed: window.innerWidth < 973,
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
    collapseLibrary(state) {
      state.collapsed = true;
    },
    toggleLibrary(state) {
      state.collapsed = !state.collapsed;
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
  return [
    state.yourLibrary.myAlbums,
    state.yourLibrary.myArtists,
    state.yourLibrary.myPlaylists,
  ].flat();
};

export const yourLibraryActions = {
  fetchMyAlbums,
  fetchMyArtists,
  fetchMyPlaylists,
  ...yourLibrarySlice.actions,
};

export default yourLibrarySlice.reducer;
