import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Album } from '../interfaces/albums';
import type { Artist } from '../interfaces/artist';
import type { Pagination } from '../interfaces/api';

/**
 * @description Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
const fetchArtist = (id: string) => axios.get<Artist>(`/artists/${id}`);

/**
 * @description Get Spotify catalog information for several artists based on their Spotify IDs.
 */
const fetchArtists = async (ids: string[]) => {
  // Feb 2026 removed the batch `/artists?ids=` endpoint; fetch each artist individually.
  const responses = await Promise.all(ids.map((id) => axios.get<Artist>(`/artists/${id}`)));
  return { ...responses[0], data: { artists: responses.map((r) => r.data) } };
};

/**
 * @description Get Spotify catalog information about an artist's albums.
 */
const fetchArtistAlbums = (
  id: string,
  params: {
    /** @description The number of album objects to return. */
    limit?: number;
    /** @description The index of the first album to return. */
    offset?: number;
    /** @description A comma-separated list of keywords that will be used to filter the response. */
    include_groups?: 'album' | 'single' | 'appears_on' | 'compilation';
    /** @description The country for which the release date will be formatted. */
    market?: string;
  } = {}
) =>
  // Feb 2026 reduced this endpoint's max `limit` from 50 to 10 (returns 400 "Invalid limit"
  // otherwise). Clamp here so every caller is safe.
  axios.get<Pagination<Album>>(`/artists/${id}/albums`, {
    params: { ...params, limit: Math.min(params.limit ?? 10, 10) },
  });

/**
 * @description Get Spotify catalog information about an artist's top tracks by country.
 */
const fetchArtistTopTracks = async (_id: string) => {
  // `/artists/{id}/top-tracks` was removed (Nov 2024 / Feb 2026) with no replacement. The
  // previous approximation cost 2 extra requests per artist load, which contributed to
  // Spotify rate-limiting the account. Return empty so the "Popular" section hides and the
  // artist page stays cheap (the album/single sections still render).
  return { data: { tracks: [] as Track[] } };
};

/**
 * @description Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.
 */
const fetchSimilarArtists = async (_id: string) => {
  // `/artists/{id}/related-artists` was removed with no first-party replacement. Return
  // empty so the Artist page's "Fans also like" section hides cleanly.
  return { data: { artists: [] as Artist[] } };
};

export const artistService = {
  fetchArtist,
  fetchArtists,
  fetchArtistAlbums,
  fetchArtistTopTracks,
  fetchSimilarArtists,
};
