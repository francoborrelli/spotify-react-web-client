// Interfaces
import type { Playlist } from '../interfaces/playlists';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';
import axios from '../axios';

/**
 * @description Get a list of the playlists owned or followed by the current Spotify user.
 */
const getMyPlaylists = async (params: PaginationQueryParams = {}) => {
  return axios.get<Pagination<Playlist>>('/me/playlists', { params });
};

export const playlistService = {
  getMyPlaylists,
};
