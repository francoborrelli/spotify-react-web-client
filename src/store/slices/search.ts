import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { querySearch } from '../../services/search';

// Interfaces
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';
import type { Track, TrackWithSave } from '../../interfaces/track';
import { RootState } from '../store';

type Item = Playlist | Album | Track | Artist;

export type SearchSection = 'ALL' | 'ARTISTS' | 'TRACKS' | 'ALBUMS' | 'PLAYLISTS';

const initialState: {
  top: Item | null;
  songs: TrackWithSave[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
  loading: boolean;
  section: SearchSection;
  songsTotal: number;
} = {
  playlists: [],
  songs: [],
  artists: [],
  albums: [],
  top: null,
  loading: true,
  section: 'ALL',
  songsTotal: 0,
};

const fetchArtists = createAsyncThunk<Artist[], string>('search/fetchArtists', async (query) => {
  const response = await querySearch({ q: query, type: 'artist', limit: 50 });
  return response.data.artists.items;
});

const fetchAlbums = createAsyncThunk<Album[], string>('search/fetchAlbums', async (query) => {
  const response = await querySearch({ q: query, type: 'album', limit: 50 });
  return response.data.albums.items;
});

const fetchPlaylists = createAsyncThunk<Playlist[], string>(
  'search/fetchPlaylists',
  async (query) => {
    const response = await querySearch({ q: query, type: 'playlist', limit: 50 });
    return response.data.playlists.items;
  }
);

const fetchSongs = createAsyncThunk<[TrackWithSave[], number], string>(
  'search/fetchSongs',
  async (query, params) => {
    const response = await querySearch({ q: query, type: 'track', limit: 50 });
    const tracks = response.data.tracks.items;
    const total = response.data.tracks.total;

    const extraRequests = [
      userService.checkSavedTracks(tracks.map((t) => t.id)).catch(() => ({
        data: [],
      })),
    ];

    await Promise.all(extraRequests);

    const saves = (await extraRequests[0]).data;

    const items = tracks.map((track, index) => ({
      ...track,
      saved: saves[index],
    }));

    return [items, total];
  }
);

const fetchMoreSongs = createAsyncThunk<TrackWithSave[], string>(
  'search/fetchMoreSongs',
  async (query, { getState }) => {
    const state = getState() as RootState;
    const { songs } = state.search;

    const response = await querySearch({
      q: query,
      limit: 50,
      type: 'track',
      offset: songs.length,
    });
    const tracks = response.data.tracks.items;

    const extraRequests = [
      userService.checkSavedTracks(tracks.map((t) => t.id)).catch(() => ({
        data: [],
      })),
    ];

    await Promise.all(extraRequests);

    const saves = (await extraRequests[0]).data;

    return tracks.map((track, index) => ({
      ...track,
      saved: saves[index],
    }));
  }
);

export const fetchSearch = createAsyncThunk<
  [Item, [TrackWithSave[], number], Artist[], Album[], Playlist[]],
  string
>('search/fetchSearch', async (query) => {
  const promises = [
    querySearch({ q: query, type: 'album,track,artist,playlist', limit: 1 }),
    querySearch({ q: query, type: 'track', limit: 5 }),
    querySearch({ q: query, type: 'album', limit: 10 }),
    querySearch({ q: query, type: 'artist', limit: 10 }),
    querySearch({ q: query, type: 'playlist', limit: 10 }),
  ];

  const responses = await Promise.all(promises);

  const topItems = [
    responses[0].data.artists.items[0],
    responses[0].data.albums.items[0],
    responses[0].data.tracks.items[0],
    responses[0].data.playlists.items[0],
  ];

  const topItem =
    topItems.find((item) => item.name?.toLowerCase() === query?.toLowerCase()) ||
    topItems.find((item) => item.name?.toLowerCase().includes(query?.toLowerCase())) ||
    topItems[0];

  const tracks = responses[1].data.tracks.items;
  const tracksTotal = responses[1].data.tracks.total;

  const artists = responses[3].data.artists.items;
  const albums = responses[2].data.albums.items;
  const playlists = responses[4].data.playlists.items;

  const extraRequests = [
    userService.checkSavedTracks(tracks.map((t) => t.id)).catch(() => ({
      data: [],
    })),
  ];

  await Promise.all(extraRequests);

  const saves = (await extraRequests[0]).data;

  const tracksWithSaves: TrackWithSave[] = tracks.map((track, index) => ({
    ...track,
    saved: saves[index],
  }));

  return [topItem, [tracksWithSaves, tracksTotal], artists, albums, playlists];
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSection(state, action: PayloadAction<SearchSection>) {
      state.section = action.payload;
    },
    setSavedStateForTrack(
      state,
      action: PayloadAction<{
        id: string;
        saved: boolean;
      }>
    ) {
      const track = state.songs.find((t) => t.id === action.payload.id);
      if (track) {
        track.saved = action.payload.saved;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.top = action.payload[0];

      state.songs = action.payload[1][0];
      state.songsTotal = action.payload[1][1];

      state.artists = action.payload[2];
      state.albums = action.payload[3];
      state.playlists = action.payload[4];
      state.loading = false;
    });
    builder.addCase(fetchSearch.rejected, (state) => {
      state.loading = false;
      state.loading = false;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.playlists = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      state.songs = action.payload[0];
      state.songsTotal = action.payload[1];
      state.loading = false;
    });
    builder.addCase(fetchMoreSongs.fulfilled, (state, action) => {
      state.songs = [...state.songs, ...action.payload];
      state.loading = false;
    });
  },
});

export const searchActions = {
  fetchSearch,
  fetchArtists,
  fetchAlbums,
  fetchPlaylists,
  fetchMoreSongs,
  fetchSongs,
  ...searchSlice.actions,
};

export default searchSlice.reducer;
