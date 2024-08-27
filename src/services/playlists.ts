// Interfaces
import type { Playlist, PlaylistItem } from '../interfaces/playlists';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';
import axios from '../axios';

/**
 * @description Get a playlist owned by a Spotify user.
 * @param playlistId The Spotify ID for the playlist.
 */
const getPlaylist = async (playlistId: string) => {
  return axios.get<Playlist>(`/playlists/${playlistId}`);
};

interface GetPlaylistItemsParams extends PaginationQueryParams {
  fields?: string;
}

/**
 * @description Get full details of the items of a playlist owned by a Spotify user.
 */
const getPlaylistItems = async (
  playlistId: string,
  params: GetPlaylistItemsParams = { limit: 50 }
) => {
  return axios.get<Pagination<PlaylistItem>>(`/playlists/${playlistId}/tracks`, { params });
};

/**
 * @description Get a list of the playlists owned or followed by the current Spotify user.
 */
const getMyPlaylists = async (params: PaginationQueryParams = {}) => {
  return axios.get<Pagination<Playlist>>('/me/playlists', { params });
};

interface GetFeaturedPlaylistsParams extends PaginationQueryParams {
  locale?: string;
}

/**
 * @description Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
 */
const getFeaturedPlaylists = async (params: GetFeaturedPlaylistsParams = {}) => {
  return axios.get<{ playlists: Pagination<Playlist> }>('/browse/featured-playlists', { params });
};

/**
 * @description Either reorder or replace items in a playlist depending on the request's parameters. To reorder items, include range_start, insert_before, range_length and snapshot_id in the request's body. To replace items, include uris as either a query parameter or in the request's body. Replacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.
 */
const reorderPlaylistItems = async (
  playlistId: string,
  uris: string[],
  rangeStart: number,
  insertBefore: number,
  rangeLength: number,
  snapshotId: string
) => {
  return axios.put(
    `/playlists/${playlistId}/tracks`,
    {
      range_start: rangeStart,
      insert_before: insertBefore,
      range_length: rangeLength,
      snapshot_id: snapshotId,
    },
    { params: { uris } }
  );
};

export const playlistService = {
  getPlaylist,
  getMyPlaylists,
  getPlaylistItems,
  getFeaturedPlaylists,
  reorderPlaylistItems,
};
