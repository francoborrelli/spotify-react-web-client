import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

// Interfaces
import type { RootState } from '../store';
import type { Track } from '../../interfaces/track';
import type { Album } from '../../interfaces/albums';
import type { Playlist } from '../../interfaces/playlists';
import { categoriesService } from '../../services/categories';

// Constants
import { MADE_FOR_YOU_URI } from '../../constants/spotify';

const initialState: {
  topTracks: Track[];
  newReleases: Album[];
  madeForYou: Playlist[];
  featurePlaylists: Playlist[];
  section: 'ALL' | 'MUSIC' | 'PODCAST';
} = {
  topTracks: [],
  section: 'ALL',
  madeForYou: [],
  newReleases: [],
  featurePlaylists: [],
};

export const fetchMadeForYou = createAsyncThunk('home/fetchMadeForYou', async () => {
  const response = await categoriesService.fetchCategoryPlaylists(MADE_FOR_YOU_URI, { limit: 10 });
  return response.data.playlists.items;
});

export const fetchNewReleases = createAsyncThunk('home/fetchNewReleases', async () => {
  const response = await albumsService.fetchNewRelases({ limit: 10 });
  return response.data.albums.items;
});

export const fetchTopTracks = createAsyncThunk('home/fetchTopTracks', async () => {
  const response = await userService.fetchTopTracks({ limit: 8, timeRange: 'short_term' });
  return response.data.items;
});

export const fecthFeaturedPlaylists = createAsyncThunk(
  'home/fecthFeaturedPlaylists',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const response = await playlistService.getFeaturedPlaylists({
      limit: 10,
      locale: state.language.language === 'es' ? 'es_AR' : undefined,
    });
    return response.data.playlists.items;
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSection(state, action: PayloadAction<'ALL' | 'MUSIC' | 'PODCAST'>) {
      state.section = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewReleases.fulfilled, (state, action) => {
      state.newReleases = action.payload as any as any[];
    });
    builder.addCase(fetchTopTracks.fulfilled, (state, action) => {
      state.topTracks = action.payload;
    });
    builder.addCase(fecthFeaturedPlaylists.fulfilled, (state, action) => {
      state.featurePlaylists = action.payload;
    });
    builder.addCase(fetchMadeForYou.fulfilled, (state, action) => {
      state.madeForYou = action.payload;
    });
  },
});

export const homeActions = {
  ...homeSlice.actions,
  fetchTopTracks,
  fetchMadeForYou,
  fetchNewReleases,
  fecthFeaturedPlaylists,
};

export default homeSlice.reducer;
