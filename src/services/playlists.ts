import axios from '../axios';

// Interfaces
import type { Track } from '../interfaces/track';
import type { Playlist, PlaylistItem } from '../interfaces/playlists';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

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
 * @description Add one or more items to a user's playlist.
 */
const addPlaylistItems = async (playlistId: string, uris: string[], snapshot_id: string) => {
  return axios.post(`/playlists/${playlistId}/tracks`, {
    uris,
    snapshot_id,
  });
};

/**
 * @description Remove one or more items from a user's playlist.
 */
const removePlaylistItems = async (playlistId: string, uris: string[], snapshot_id: string) => {
  return axios.delete(`/playlists/${playlistId}/tracks`, {
    data: {
      tracks: uris.map((uri) => ({ uri })),
      snapshot_id,
    },
  });
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

/**
 * @description Change a playlist's name and public/private state. (The user must, of course, own the playlist.)
 */
const changePlaylistDetails = async (
  playlistId: string,
  data: {
    name?: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
  }
) => {
  return axios.put(`/playlists/${playlistId}`, data);
};

/**
 * @description Replace the image used to represent a specific playlist.
 * @body Base64 encoded JPEG image data, maximum payload size is 256 KB.
 */
const changePlaylistImage = async (playlistId: string, image: string, content: string) => {
  return axios.put(`/playlists/${playlistId}/images`, image, {
    headers: { 'Content-Type': content },
  });
};

/**
 * @description Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.) Each user is generally limited to a maximum of 11000 playlists.
 */
const createPlaylist = async (
  userId: string,
  data: {
    name: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
  }
) => {
  return axios.post<Playlist>(`/users/${userId}/playlists`, data);
};

/**
 * @description Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
 */
const getRecommendations = async (params: {
  seed_artists?: string;
  seed_genres?: string;
  limit?: number;
  seed_tracks?: string;
}) => {
  return axios.get<{ tracks: Track[] }>('/recommendations', { params });
};

/**
 * @description Get a list of the playlists owned or followed by a Spotify user.
 */
const getPlaylists = async (
  userId: string,
  params: {
    limit?: number;
    offset?: number;
  }
) => {
  return axios.get<Pagination<Playlist>>(`/users/${userId}/playlists`, { params });
};

export const playlistService = {
  getPlaylist,
  getPlaylists,
  getMyPlaylists,
  createPlaylist,
  getPlaylistItems,
  addPlaylistItems,
  getRecommendations,
  changePlaylistImage,
  removePlaylistItems,
  getFeaturedPlaylists,
  reorderPlaylistItems,
  changePlaylistDetails,
};
