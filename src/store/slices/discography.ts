import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { artistService } from '../../services/artist';

// Interfaces
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Pagination } from '../../interfaces/api';

const initialState: {
  albums: Album[];
  singles: Album[];
  compilations: Album[];
  filter: 'All' | 'Album' | 'Singles' | 'Compilations';

  artist: Artist | null;

  loading: boolean;
} = {
  artist: null,
  filter: 'All',
  loading: true,
  albums: [],
  singles: [],
  compilations: [],
};

const fetchData = createAsyncThunk<[Artist, Album[][]], string>(
  'discography/fetchData',
  async (id) => {
    const promises = [
      artistService.fetchArtist(id),
      artistService.fetchArtistAlbums(id, { limit: 50, include_groups: 'album' }),
      artistService.fetchArtistAlbums(id, { limit: 50, include_groups: 'single' }),
      artistService.fetchArtistAlbums(id, { limit: 50, include_groups: 'compilation' }),
    ];

    const responses = await Promise.all(promises);

    const artist = responses[0].data as Artist;
    const albums = (responses[1].data as Pagination<Album>).items as Album[];
    const singles = (responses[2].data as Pagination<Album>).items as Album[];
    const compilations = (responses[3].data as Pagination<Album>).items as Album[];

    return [artist, [albums, singles, compilations]];
  }
);

const artistDiscographySlice = createSlice({
  name: 'discography',
  initialState,
  reducers: {
    setArtist(state, action: PayloadAction<{ artist: Artist | null }>) {
      state.artist = action.payload.artist;
      if (!action.payload.artist) {
        state.albums = [];
        state.singles = [];
        state.compilations = [];
        state.loading = true;
        state.artist = null;
      }
    },
    setFilter(
      state,
      action: PayloadAction<{ filter: 'All' | 'Album' | 'Singles' | 'Compilations' }>
    ) {
      state.filter = action.payload.filter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.artist = action.payload[0];
      state.albums = action.payload[1][0];
      state.singles = action.payload[1][1];
      state.compilations = action.payload[1][2];
      state.loading = false;
    });
  },
});

export const artistDiscographyActions = {
  fetchData,
  ...artistDiscographySlice.actions,
};

export default artistDiscographySlice.reducer;
