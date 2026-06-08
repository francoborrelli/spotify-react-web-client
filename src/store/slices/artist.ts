import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { artistService } from '../../services/artist';

// Interfaces
import type { Album } from '../../interfaces/albums';
import type { Pagination } from '../../interfaces/api';
import type { Artist } from '../../interfaces/artist';
import type { Track, TrackWithSave } from '../../interfaces/track';
import { RootState } from '../store';

// Shape produced by the RTK Query `getArtistPage` endpoint and mirrored into this slice so the
// existing Artist sub-components (which read state.artist.*) keep working unchanged.
export interface ArtistPageData {
  artist: Artist;
  following: boolean;
  topTracks: TrackWithSave[];
  albums: Album[];
  singles: Album[];
  appearsOn: Album[];
  compilations: Album[];
  otherArtists: Artist[];
}

const initialState: {
  albums: Album[];
  singles: Album[];
  appearsOn: Album[];
  compilations: Album[];

  otherArtists: Artist[];

  artist: Artist | null;
  topTracks: TrackWithSave[];

  loading: boolean;
  following: boolean;
} = {
  topTracks: [],
  albums: [],
  artist: null,
  otherArtists: [],

  loading: true,
  following: false,
  singles: [],
  appearsOn: [],
  compilations: [],
};

export const fetchArtist = createAsyncThunk<[Artist, boolean, TrackWithSave[], Album[][]], string>(
  'artist/fetchArtist',
  async (id, params) => {
    const state = params.getState() as RootState;
    const user = state.auth.user;

    const promises = [
      artistService.fetchArtist(id),
      user ? userService.checkFollowingArtists([id]) : Promise.resolve({ data: [false] }),
      artistService.fetchArtistTopTracks(id),
      // One combined album request instead of four (one per include_group), to stay under
      // Spotify's tightened rate limit. We partition client-side by `album_type`. Note
      // `appears_on` can no longer be distinguished (the `album_group` field was removed in
      // Feb 2026), so that section stays empty and hides.
      artistService.fetchArtistAlbums(id, {
        limit: 50,
        include_groups: 'album,single,appears_on,compilation' as any,
      }),
    ];

    const responses = await Promise.all(promises);

    const artist = responses[0].data as Artist;
    const [following] = responses[1].data as boolean[];

    const tracks = (responses[2].data as any).tracks as Track[];

    const allAlbums = (responses[3].data as Pagination<Album>).items as Album[];
    const albums = allAlbums.filter((a) => a.album_type === 'album');
    const singles = allAlbums.filter((a) => a.album_type === 'single');
    const compilations = allAlbums.filter((a) => a.album_type === 'compilation');
    const appearsOn: Album[] = [];

    const extraResponses = await Promise.all([
      tracks.length
        ? userService.checkSavedTracks(tracks.map((track) => track.id)).catch(() => ({ data: [] }))
        : Promise.resolve({ data: [] }),
    ]);

    const saved = extraResponses[0].data as boolean[];
    const itemsWithSave: TrackWithSave[] = tracks.map((item, index) => ({
      ...item,
      saved: saved[index],
    }));

    return [artist, following, itemsWithSave, [albums, singles, appearsOn, compilations]];
  }
);

const fetchOtherArtists = createAsyncThunk<Artist[], string>(
  'artist/fetchOtherArtists',
  async (id) => {
    const response = await artistService.fetchSimilarArtists(id);
    return response.data.artists;
  }
);

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    setFollowing(state, action: PayloadAction<{ following: boolean }>) {
      state.following = action.payload.following;
    },
    setArtist(state, action: PayloadAction<{ artist: Artist | null }>) {
      state.artist = action.payload.artist;
      if (!action.payload.artist) {
        state.albums = [];
        state.singles = [];
        state.appearsOn = [];
        state.compilations = [];
        state.topTracks = [];
        state.following = false;
        state.loading = true;
        state.artist = null;
        state.otherArtists = [];
      }
    },
    setTopSongLikeState(state, action: PayloadAction<{ id: string; saved: boolean }>) {
      state.topTracks = state.topTracks.map((track) =>
        track.id === action.payload.id ? { ...track, saved: action.payload.saved } : track
      );
    },
    // Mirror an RTK Query `getArtistPage` result into this slice (the page is now loaded via
    // RTK Query for caching/dedup; the slice stays a view mirror for existing components).
    setArtistData(state, action: PayloadAction<ArtistPageData>) {
      const p = action.payload;
      state.artist = p.artist;
      state.following = p.following;
      state.topTracks = p.topTracks;
      state.albums = p.albums;
      state.singles = p.singles;
      state.appearsOn = p.appearsOn;
      state.compilations = p.compilations;
      state.otherArtists = p.otherArtists;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.artist = action.payload[0];
      state.following = action.payload[1];
      state.topTracks = action.payload[2];
      state.albums = action.payload[3][0];
      state.singles = action.payload[3][1];
      state.appearsOn = action.payload[3][2];
      state.compilations = action.payload[3][3];
      state.loading = false;
    });
    builder.addCase(fetchOtherArtists.fulfilled, (state, action) => {
      state.otherArtists = action.payload;
    });
  },
});

export const artistActions = {
  fetchArtist,
  fetchOtherArtists,
  ...artistSlice.actions,
};

export default artistSlice.reducer;
