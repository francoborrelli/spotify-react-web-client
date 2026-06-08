import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { albumsService } from '../../services/albums';
import { artistService } from '../../services/artist';
import { playerService } from '../../services/player';
import { playlistService } from '../../services/playlists';

// Interfaces
import type { RootState } from '../store';
import type { Track } from '../../interfaces/track';
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';
import type { Episode } from '../../interfaces/episode';
import { categoriesService } from '../../services/categories';
import { searchEpisodes } from '../../services/search';
import { fetchMoreLikeArtistItems } from '../../pages/Home/utils/fetchMoreLikeArtistItems';

// Utils
import { groupBy, uniq, uniqBy } from 'lodash';

// Constants
import {
  MADE_FOR_YOU_URI,
  PODCAST_SEARCH_MIGHT_LIKE_QUERY,
  PODCAST_SEARCH_TO_TRY_QUERY,
  RANKING_URI,
  TRENDING_URI,
} from '../../constants/spotify';

export interface MoreLikeArtistSection {
  artist: Artist;
  items: Awaited<ReturnType<typeof fetchMoreLikeArtistItems>>;
}


const initialState: {
  topTracks: Track[];
  newReleases: Album[];
  madeForYou: Playlist[];
  featurePlaylists: Playlist[];
  rankings: Playlist[];
  trending: Playlist[];
  recentlyPlayed: (Track | Artist | Album)[];
  section: 'ALL' | 'MUSIC' | 'PODCAST';
  podcastFilter: 'PODCASTS' | 'FOLLOWING';
  episodesMightLike: Episode[];
  episodesToTry: Episode[];
  moreLikeArtists: MoreLikeArtistSection[];
} = {
  trending: [],
  rankings: [],
  topTracks: [],
  section: 'ALL',
  podcastFilter: 'PODCASTS',
  madeForYou: [],
  newReleases: [],
  recentlyPlayed: [],
  featurePlaylists: [],
  episodesMightLike: [],
  episodesToTry: [],
  moreLikeArtists: [],
};

export const fetchMadeForYou = createAsyncThunk('home/fetchMadeForYou', async () => {
  const response = await categoriesService.fetchCategoryPlaylists(MADE_FOR_YOU_URI, { limit: 50 });
  return response.data.playlists.items;
});

export const fetchRanking = createAsyncThunk('home/fetchRanking', async () => {
  const response = await categoriesService.fetchCategoryPlaylists(RANKING_URI, { limit: 10 });
  return response.data.playlists.items;
});

export const fetchTrending = createAsyncThunk('home/fetchTrending', async () => {
  const response = await categoriesService.fetchCategoryPlaylists(TRENDING_URI, { limit: 10 });
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

export const fetchRecentlyPlayed = createAsyncThunk('home/fetchRecentlyPlayed', async () => {
  try {
    const response = await playerService.getRecentlyPlayed({ limit: 50 });

    const items = response.items;

    const groupedItems = groupBy(
      items.filter((item) => ['artist', 'playlist', 'album'].includes(item.context?.type)),
      (item) => item.context.type,
    );

    const artistsTracks = groupedItems['artist'] || [];
    const albumsTracks = groupedItems['album'] || [];

    // Cap how many ids we resolve: batch endpoints were removed (Feb 2026), so each id is now an
    // individual GET. Resolving every unique id from 50 recently-played items could fire dozens of
    // requests and trip the rate limit; the row only shows a handful, so 8 each is plenty.
    const artistsIds = uniq(artistsTracks.map((item) => item.context.uri.split(':')[2])).slice(0, 8);
    const albumsIds = uniq(albumsTracks.map((item) => item.context.uri.split(':')[2])).slice(0, 8);

    const promises = [
      artistsIds.length
        ? artistService.fetchArtists(artistsIds)
        : Promise.resolve({ data: { artists: [] } }),
      albumsIds.length
        ? albumsService.fetchAlbums(albumsIds)
        : Promise.resolve({ data: { albums: [] } }),
    ];

    const [artistsResponse, albumsResponse] = await Promise.all(promises);

    // @ts-ignore
    const artists: Artist[] = artistsResponse.data.artists;

    // @ts-ignore
    const albums: Album[] = albumsResponse.data.albums;

    const tracks = items.map((item) => {
      if (item.context?.type === 'artist') {
        return artists.find((artist) => artist.id === item.context.uri.split(':')[2])!;
      }

      if (item.context?.type === 'album') {
        return albums.find((album) => album.id === item.context.uri.split(':')[2])!;
      }

      return item.track;
    });

    return uniqBy(tracks, 'id');
  } catch (error) {
    console.log(error);
    return [];
  }
});

const normalizeSearchEpisodes = (items: Episode[] = []) =>
  items.filter((episode): episode is Episode => !!episode?.id && !!episode?.name && !!episode?.uri);

const pickUniqueEpisodes = (pools: Episode[][], countPerPool: number) => {
  const seen = new Set<string>();
  const pick = (pool: Episode[], count: number) => {
    const picked: Episode[] = [];
    for (const episode of pool) {
      if (picked.length >= count) break;
      if (seen.has(episode.id)) continue;
      seen.add(episode.id);
      picked.push(episode);
    }
    return picked;
  };

  const [mightLikePool, toTryPool, ...fallbackPools] = pools;
  const mightLike = pick(mightLikePool, countPerPool);
  let toTry = pick(toTryPool, countPerPool);

  if (toTry.length < countPerPool) {
    const fallback = fallbackPools.flat();
    toTry = [...toTry, ...pick(fallback, countPerPool - toTry.length)];
  }

  return { mightLike, toTry };
};

export const fetchPodcastEpisodes = createAsyncThunk('home/fetchPodcastEpisodes', async () => {
  const [mightLikeRes, toTryRes] = await Promise.all([
    searchEpisodes({ q: PODCAST_SEARCH_MIGHT_LIKE_QUERY, limit: 20 }),
    searchEpisodes({ q: PODCAST_SEARCH_TO_TRY_QUERY, limit: 20, offset: 5 }),
  ]);

  const mightLikePool = normalizeSearchEpisodes(mightLikeRes.data.episodes?.items);
  const toTryPool = normalizeSearchEpisodes(toTryRes.data.episodes?.items);
  const combinedFallback = uniqBy([...toTryPool, ...mightLikePool], 'id');

  return pickUniqueEpisodes([mightLikePool, toTryPool, combinedFallback], 1);
});

export const fetchMoreLikeArtists = createAsyncThunk('home/fetchMoreLikeArtists', async () => {
  // Disabled. This fanned out `GET /artists/{id}/albums` per followed artist on EVERY Home load,
  // which Spotify rate-limits *per endpoint* — that single endpoint was being driven into a 429
  // cooldown while every other endpoint stayed healthy. The section was already degraded anyway
  // (related-artists was removed from the API in Nov 2024 / Feb 2026, so it only showed the
  // artist's own albums + name-matched playlists). Returning [] stops the hammering and lets the
  // endpoint's rate-limit window recover. Re-enable via fetchMoreLikeArtistItems if quota allows.
  return [];
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
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSection(state, action: PayloadAction<'ALL' | 'MUSIC' | 'PODCAST'>) {
      state.section = action.payload;
      if (action.payload !== 'PODCAST') {
        state.podcastFilter = 'PODCASTS';
      }
    },
    setPodcastFilter(state, action: PayloadAction<'PODCASTS' | 'FOLLOWING'>) {
      state.podcastFilter = action.payload;
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
    builder.addCase(fetchRecentlyPlayed.fulfilled, (state, action) => {
      state.recentlyPlayed = action.payload;
    });
    builder.addCase(fetchRanking.fulfilled, (state, action) => {
      state.rankings = action.payload;
    });
    builder.addCase(fetchTrending.fulfilled, (state, action) => {
      state.trending = action.payload;
    });
    builder.addCase(fetchPodcastEpisodes.fulfilled, (state, action) => {
      state.episodesMightLike = action.payload.mightLike;
      state.episodesToTry = action.payload.toTry;
    });
    builder.addCase(fetchMoreLikeArtists.fulfilled, (state, action) => {
      state.moreLikeArtists = action.payload;
    });
  },
});

export const homeActions = {
  ...homeSlice.actions,
  fetchRanking,
  fetchTrending,
  fetchTopTracks,
  fetchMadeForYou,
  fetchNewReleases,
  fetchRecentlyPlayed,
  fecthFeaturedPlaylists,
  fetchPodcastEpisodes,
  fetchMoreLikeArtists,
};

export default homeSlice.reducer;
