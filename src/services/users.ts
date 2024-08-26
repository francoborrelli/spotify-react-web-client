import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Artist } from '../interfaces/artist';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';
import { Episode } from '../interfaces/episode';

interface FetchTopItemsParams extends PaginationQueryParams {
  /** @description Over what time frame the affinities are computed. Valid values: long_term (calculated from ~1 year of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks). Default: medium_term */
  timeRange: 'long_term' | 'medium_term' | 'short_term';
}

/**
 * @description Get the current user's top  tracks based on calculated affinity.
 */
const fetchTopTracks = async (params: FetchTopItemsParams) => {
  return await axios.get<Pagination<Track>>(`/me/top/tracks`, { params });
};

/**
 * @description Get the current user's top artists based on calculated affinity.
 */
const fetchTopArtists = async (params: FetchTopItemsParams) => {
  return await axios.get<Pagination<Artist>>(`/me/top/artists`, { params });
};

/**
 * @description Get the current user's followed artists.
 */
const fetchFollowedArtists = async (params: PaginationQueryParams = {}) => {
  return await axios.get<{ artists: Pagination<Artist> }>(`/me/following`, {
    params: { ...params, type: 'artist' },
  });
};

/**
 * @description Get the list of objects that make up the user's queue.
 */
const fetchQueue = async () => {
  return await axios.get<{ currently_playing: Track | Episode; queue: (Track | Episode)[] }>(
    `/me/player/queue`
  );
};

/**
 * @description Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
 */
const checkSavedTracks = async (ids: string[]) => {
  return await axios.get<boolean[]>('/me/tracks/contains', { params: { ids: ids.join(',') } });
};

export const userService = {
  fetchQueue,
  fetchTopArtists,
  fetchTopTracks,
  checkSavedTracks,
  fetchFollowedArtists,
};
