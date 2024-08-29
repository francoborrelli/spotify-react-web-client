import axios from '../axios';

import type { Playlist } from '../interfaces/playlists';
import type { Category } from '../interfaces/categories';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

/**
 * @description Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
const fetchCategories = (params: PaginationQueryParams = {}) =>
  axios.get<{ categories: Pagination<Category> }>('/browse/categories', { params });

/**
 * @description Get a list of Spotify playlists tagged with a particular category.
 */
const fetchCategoryPlaylists = (categoryId: string, params: PaginationQueryParams = {}) =>
  axios.get<{ playlists: Pagination<Playlist> }>(`/browse/categories/${categoryId}/playlists`, {
    params,
  });

/**
 * @description Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
const fetchCategory = (categoryId: string) =>
  axios.get<Category>(`/browse/categories/${categoryId}`);

export const categoriesService = {
  fetchCategories,
  fetchCategoryPlaylists,
  fetchCategory,
};
