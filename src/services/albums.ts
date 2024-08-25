import axios from '../axios';

import type { Album } from '../interfaces/albums';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

const fetchNewRelases = (params: PaginationQueryParams = {}) =>
  axios.get<{ albums: Pagination<Album> }>('/browse/new-releases', { params });

/**
 * @description Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 */
const fetchSavedAlbums = (params: PaginationQueryParams = {}) =>
  axios.get<Pagination<{ added_at: string; album: Album }>>('/me/albums', { params });

export const albumsService = {
  fetchNewRelases,
  fetchSavedAlbums,
};
