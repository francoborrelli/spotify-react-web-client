import axios from '../axios';

import type { Album } from '../interfaces/albums';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

const fetchNewRelases = (params: PaginationQueryParams = {}) =>
  axios.get<{ albums: Pagination<Album> }>('/browse/new-releases', { params });

export const albumsService = {
  fetchNewRelases,
};
