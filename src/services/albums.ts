import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Album, AlbumFullObject } from '../interfaces/albums';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

const fetchNewRelases = async (_params: PaginationQueryParams = {}) => {
  // `/browse/new-releases` was removed (Nov 2024 / Feb 2026). The previous approximation
  // (latest albums from each followed artist) fired ~7 requests on every Home load, which was
  // a major contributor to hitting Spotify's rate limit. Return empty so the "New releases"
  // row hides cleanly and Home stays cheap; the user's other personalized rows still populate.
  return { data: { albums: { items: [] } as unknown as Pagination<Album> } };
};

/**
 * @description Get Spotify catalog information for a single album.
 */
const fetchAlbum = (id: string) => axios.get<AlbumFullObject>(`/albums/${id}`);

/**
 * @description Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 */
const fetchAlbums = async (ids: string[]) => {
  // Feb 2026 removed the batch `/albums?ids=` endpoint; fetch each album individually.
  const responses = await Promise.all(ids.map((id) => axios.get<Album>(`/albums/${id}`)));
  return { ...responses[0], data: { albums: responses.map((r) => r.data) } };
};

/**
 * @description Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
 */
const fetchAlbumTracks = (id: string, params: PaginationQueryParams = {}) =>
  axios.get<Pagination<Track>>(`/albums/${id}/tracks`, { params });

/**
 * @description Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 */
const fetchSavedAlbums = (params: PaginationQueryParams = {}) =>
  axios.get<Pagination<{ added_at: string; album: Album }>>('/me/albums', { params });

/**
 * @description Save one or more albums to the current user's 'Your Music' library.
 */
const saveAlbums = (ids: string[]) =>
  axios.put('/me/library', { uris: ids.map((id) => `spotify:album:${id}`) });

/**
 * @description Remove one or more albums from the current user's 'Your Music' library.
 */
const deleteAlbums = (ids: string[]) =>
  axios.delete('/me/library', { data: { uris: ids.map((id) => `spotify:album:${id}`) } });

export const albumsService = {
  fetchAlbum,
  fetchAlbums,
  fetchNewRelases,
  fetchSavedAlbums,
  fetchAlbumTracks,
  saveAlbums,
  deleteAlbums,
};
