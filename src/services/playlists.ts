import axios from '../axios';

// Interfaces
import type { Track } from '../interfaces/track';
import type { Playlist, PlaylistItem } from '../interfaces/playlists';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

// Feb 2026 renamed the playlist object's track-count field `tracks` → `items` (both carry
// `.total`). Backfill `tracks` from `items` so every component that reads `playlist.tracks.total`
// (grid cards, header, sidebar) keeps working instead of showing "undefined songs".
const normalizePlaylist = (p: any) => {
  if (p && !p.tracks && p.items) p.tracks = p.items;
  return p;
};

/**
 * @description Get a playlist owned by a Spotify user.
 * @param playlistId The Spotify ID for the playlist.
 */
const getPlaylist = async (playlistId: string) => {
  const response = await axios.get<Playlist>(`/playlists/${playlistId}`);
  normalizePlaylist(response.data);
  return response;
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
  const response = await axios.get<Pagination<PlaylistItem>>(`/playlists/${playlistId}/items`, {
    params,
  });
  // Feb 2026 renamed `/tracks` → `/items` and each entry's `track` field → `item`.
  // Remap back to the legacy `{ ...entry, track }` shape so the Redux slice and the
  // track table (which read `item.track`) stay untouched.
  const items = response.data?.items as unknown as Array<Record<string, any>> | undefined;
  items?.forEach((entry) => {
    if (entry && entry.item && !entry.track) entry.track = entry.item;
  });
  return response;
};

/**
 * @description Get a list of the playlists owned or followed by the current Spotify user.
 */
const getMyPlaylists = async (params: PaginationQueryParams = {}) => {
  const response = await axios.get<Pagination<Playlist>>('/me/playlists', { params });
  response.data?.items?.forEach(normalizePlaylist);
  return response;
};

interface GetFeaturedPlaylistsParams extends PaginationQueryParams {
  locale?: string;
}

/**
 * @description Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
 */
const getFeaturedPlaylists = async (_params: GetFeaturedPlaylistsParams = {}) => {
  // `/browse/featured-playlists` was removed (Nov 2024 / Feb 2026) with no replacement.
  // Return empty so the Home "Featured playlists" row hides cleanly (the component renders
  // null on an empty list); the user's own playlists still appear via their dedicated row.
  const empty = {
    items: [],
    total: 0,
    limit: 0,
    offset: 0,
    next: null,
    previous: null,
  } as unknown as Pagination<Playlist>;
  return { data: { playlists: empty } };
};

/**
 * @description Add one or more items to a user's playlist.
 */
const addPlaylistItems = async (playlistId: string, uris: string[], snapshot_id: string) => {
  return axios.post(`/playlists/${playlistId}/items`, {
    uris,
    snapshot_id,
  });
};

/**
 * @description Remove one or more items from a user's playlist.
 */
const removePlaylistItems = async (playlistId: string, uris: string[], snapshot_id: string) => {
  return axios.delete(`/playlists/${playlistId}/items`, {
    data: {
      items: uris.map((uri) => ({ uri })),
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
    `/playlists/${playlistId}/items`,
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
  // Feb 2026 removed `POST /users/{id}/playlists`; only the current user's `/me/playlists` works.
  return axios.post<Playlist>(`/me/playlists`, data);
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
  // `/recommendations` was removed (Nov 2024 / Feb 2026) with no public replacement.
  // Repurpose with the user's short-term top tracks so the "recommended" row stays
  // populated. Seeds are ignored; the response is reshaped to the legacy `{ tracks }`.
  const response = await axios.get<Pagination<Track>>('/me/top/tracks', {
    params: { limit: params.limit ?? 25, time_range: 'short_term' },
  });
  return { ...response, data: { tracks: response.data.items } };
};

/**
 * @description Get a list of the playlists owned or followed by a Spotify user.
 */
const getPlaylists = async (
  _userId: string,
  params: {
    limit?: number;
    offset?: number;
  }
) => {
  // Feb 2026 removed `/users/{id}/playlists` (other users). Only the current user's
  // playlists are available now, so this returns `/me/playlists` regardless of `_userId`.
  const response = await axios.get<Pagination<Playlist>>(`/me/playlists`, { params });
  response.data?.items?.forEach(normalizePlaylist);
  return response;
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
