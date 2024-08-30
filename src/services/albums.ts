import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Album, AlbumFullObject } from '../interfaces/albums';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

const fetchNewRelases = (params: PaginationQueryParams = {}) =>
  axios.get<{ albums: Pagination<Album> }>('/browse/new-releases', { params });

/**
 * @description Get Spotify catalog information for a single album.
 */
const fetchAlbum = (id: string) => axios.get<AlbumFullObject>(`/albums/${id}`);

/**
 * @description Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 */
const fetchAlbums = (ids: string[]) =>
  axios.get<{ albums: Album[] }>(`/albums`, { params: { ids: ids.join(',') } });

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
const saveAlbums = (ids: string[]) => axios.put('/me/albums', { ids });

/**
 * @description Remove one or more albums from the current user's 'Your Music' library.
 */
const deleteAlbums = (ids: string[]) => axios.delete('/me/albums', { data: { ids } });

export const albumsService = {
  fetchAlbum,
  fetchAlbums,
  fetchNewRelases,
  fetchSavedAlbums,
  fetchAlbumTracks,
  saveAlbums,
  deleteAlbums,
};
