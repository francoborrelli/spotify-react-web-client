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
const fetchArtists = (ids: string[]) =>
  axios.get<{ artists: Artist[] }>(`/artists`, { params: { ids: ids.join(',') } });

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
) => axios.get<Pagination<Album>>(`/artists/${id}/albums`, { params });

/**
 * @description Get Spotify catalog information about an artist's top tracks by country.
 */
const fetchArtistTopTracks = (id: string) =>
  axios.get<{ tracks: Track }>(`/artists/${id}/top-tracks`);

/**
 * @description Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.
 */
const fetchSimilarArtists = (id: string) =>
  axios.get<{ artists: Artist[] }>(`/artists/${id}/related-artists`);

export const artistService = {
  fetchArtist,
  fetchArtists,
  fetchArtistAlbums,
  fetchArtistTopTracks,
  fetchSimilarArtists,
};
