import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Artist } from '../interfaces/artist';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';
import { Episode } from '../interfaces/episode';
import { User } from '../interfaces/user';
import { PlaylistItem } from '../interfaces/playlists';

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

/**
 * @description Save one or more tracks to the current user's 'Your Music' library.
 */
const saveTracks = async (ids: string[]) => {
  return await axios.put('/me/tracks', { ids });
};

/**
 * @description Remove one or more tracks from the current user's 'Your Music' library.
 * @param ids An array of the Spotify IDs of the tracks. A maximum of 50 IDs can be sent in one request.
 */
const deleteTracks = async (ids: string[]) => {
  return await axios.delete('/me/tracks', { data: { ids } });
};

/**
 * @description Check to see if the current user is following a specified playlist.
 */
const checkFollowedPlaylist = async (playlistId: string) => {
  return await axios.get<boolean[]>(`/playlists/${playlistId}/followers/contains`).catch(() => {
    return { data: false };
  });
};

/**
 * @description Check to see if the current user is following one or more artists or other Spotify users.
 */
const checkFollowingArtists = async (ids: string[]) => {
  return await axios.get<boolean[]>('/me/following/contains', {
    params: { type: 'artist', ids: ids.join(',') },
  });
};

/**
 * @description Check to see if the current user is following one or more other Spotify users.
 */
const checkFollowingUsers = async (ids: string[]) => {
  return await axios.get<boolean[]>('/me/following/contains', {
    params: { type: 'user', ids: ids.join(',') },
  });
};

/**
 * @description Get public profile information about a Spotify user.
 */
const getUser = async (id: string) => {
  return await axios.get<User>(`/users/${id}`);
};

/**
 * @description Remove the current user as a follower of a playlist.
 */
const unfollowPlaylist = async (playlistId: string) => {
  return await axios.delete(`/playlists/${playlistId}/followers`);
};

/**
 * @description Add the current user as a follower of a playlist.
 */
const followPlaylist = async (playlistId: string) => {
  return await axios.put(`/playlists/${playlistId}/followers`);
};

/**
 * @description Add the current user as a follower of one or more artists or other Spotify users.
 */
const followArtists = async (ids: string[]) => {
  return await axios.put('/me/following', { type: 'artist', ids });
};

/**
 * @description Remove the current user as a follower of one or more artists or other Spotify users.
 */
const unfollowArtists = async (ids: string[]) => {
  return await axios.delete('/me/following', { params: { type: 'artist', ids: ids.join(',') } });
};

/**
 * @description Add the current user as a follower of one or more users or other Spotify users.
 */
const followUsers = async (ids: string[]) => {
  return await axios.put('/me/following', { type: 'user', ids });
};

/**
 * @description Remove the current user as a follower of one or more other Spotify users.
 */
const unfollowUsers = async (ids: string[]) => {
  return await axios.delete('/me/following', { params: { type: 'user', ids: ids.join(',') } });
};

/**
 * @description Get a list of the songs saved in the current Spotify user's 'Your Music' library.
 */
const getSavedTracks = async (params: PaginationQueryParams = {}) => {
  return await axios.get<Pagination<PlaylistItem>>(`/me/tracks`, { params });
};

export const userService = {
  getUser,
  saveTracks,
  fetchQueue,
  deleteTracks,
  getSavedTracks,
  fetchTopArtists,
  fetchTopTracks,
  checkSavedTracks,
  followPlaylist,
  checkFollowingUsers,
  followUsers,
  unfollowUsers,
  fetchFollowedArtists,
  checkFollowedPlaylist,
  unfollowPlaylist,
  checkFollowingArtists,
  followArtists,
  unfollowArtists,
};
