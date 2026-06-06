import type { Playlist } from '../interfaces/playlists';
import type { Category } from '../interfaces/categories';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

// The `/browse/*` family (categories, category playlists, single category) was removed in
// Nov 2024 / Feb 2026 with no replacement. These return empty results so the Browse page and
// the category-backed Home rows (Made For You / Rankings / Trending) hide cleanly instead of
// throwing 404s. Callers' response shapes are preserved.
const emptyPage = <T>() =>
  ({
    items: [],
    total: 0,
    limit: 0,
    offset: 0,
    next: null,
    previous: null,
  }) as unknown as Pagination<T>;

/**
 * @description (Removed by Spotify.) Previously: list of browse categories.
 */
const fetchCategories = async (_params: PaginationQueryParams = {}) => {
  return { data: { categories: emptyPage<Category>() } };
};

/**
 * @description (Removed by Spotify.) Previously: playlists tagged with a category.
 */
const fetchCategoryPlaylists = async (_categoryId: string, _params: PaginationQueryParams = {}) => {
  return { data: { playlists: emptyPage<Playlist>() } };
};

/**
 * @description (Removed by Spotify.) Previously: a single browse category.
 */
const fetchCategory = async (_categoryId: string) => {
  return { data: null as unknown as Category };
};

export const categoriesService = {
  fetchCategories,
  fetchCategoryPlaylists,
  fetchCategory,
};
