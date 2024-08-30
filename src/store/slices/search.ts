import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { querySearch } from '../../services/search';

// Interfaces
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';
import type { Track, TrackWithSave } from '../../interfaces/track';

type Item = Playlist | Album | Track | Artist;

export type SearchSection = 'ALL' | 'ARTISTS' | 'SONGS' | 'ALBUMS' | 'PLAYLISTS';

const initialState: {
  top: Item | null;
  songs: TrackWithSave[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
  loading: boolean;
  section: SearchSection;
} = {
  playlists: [],
  songs: [],
  artists: [],
  albums: [],
  top: null,
  loading: true,
  section: 'ALL',
};

export const fetchArtists = createAsyncThunk<Artist[], string>(
  'search/fetchArtists',
  async (query) => {
    const response = await querySearch({ q: query, type: 'artist', limit: 50 });
    return response.data.artists.items;
  }
);

export const fetchSearch = createAsyncThunk<
  [Item, TrackWithSave[], Artist[], Album[], Playlist[]],
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
    topItems.find((item) => item.name.toLowerCase() === query.toLowerCase()) ||
    topItems.find((item) => item.name.toLowerCase().includes(query.toLowerCase())) ||
    topItems[0];

  const tracks = responses[1].data.tracks.items;

  const artists = responses[3].data.artists.items;
  const albums = responses[2].data.albums.items;
  const playlists = responses[4].data.playlists.items;

  const extraRequests = [userService.checkSavedTracks(tracks.map((t) => t.id))];

  await Promise.all(extraRequests);

  const saves = (await extraRequests[0]).data;

  const tracksWithSaves: TrackWithSave[] = tracks.map((track, index) => ({
    ...track,
    saved: saves[index],
  }));

  return [topItem, tracksWithSaves, artists, albums, playlists];
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
      state.songs = action.payload[1];
      state.artists = action.payload[2];
      state.albums = action.payload[3];
      state.playlists = action.payload[4];
      state.loading = false;
    });
    builder.addCase(fetchSearch.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
  },
});

export const searchActions = {
  fetchSearch,
  fetchArtists,
  ...searchSlice.actions,
};

export default searchSlice.reducer;
