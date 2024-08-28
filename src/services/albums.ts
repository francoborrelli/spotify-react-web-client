import axios from '../axios';

import type { Album } from '../interfaces/albums';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';
import type { Track } from '../interfaces/track';

const fetchNewRelases = (params: PaginationQueryParams = {}) =>
  axios.get<{ albums: Pagination<Album> }>('/browse/new-releases', { params });

/**
 * @description Get Spotify catalog information for a single album.
 */
const fetchAlbum = (id: string) => axios.get<Album>(`/albums/${id}`);

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

export const albumsService = {
  fetchAlbum,
  fetchNewRelases,
  fetchSavedAlbums,
  fetchAlbumTracks,
};
