import axios from '../axios';
import type { Artist } from '../interfaces/artist';

/**
 * @description Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
const fetchArtist = (id: string) => axios.get<Artist>(`/artists/${id}`);

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
) => axios.get(`/artists/${id}/albums`, { params });

export const artistService = {
  fetchArtist,
  fetchArtistAlbums,
};
