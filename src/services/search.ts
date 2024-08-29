import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Album } from '../interfaces/albums';
import type { Artist } from '../interfaces/artist';
import type { Pagination } from '../interfaces/api';
import type { Playlist } from '../interfaces/playlists';

/**
 * @description Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
 */
export const querySearch = (params: {
  /**
   * @description Search query keywords and optional field filters and operators.
   */
  q: string;
  /**
   * @description A comma-separated list of item types to search across.
   */
  type: string;
  /**
   * @description An ISO 3166-1 alpha-2 country code or the string from_token. Provide this parameter if you want to apply Track Relinking.
   */
  market?: string;
  /**
   * @description The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  limit?: number;
  /**
   * @description The index of the first item to return. Default: 0 (the first object). Use with limit to get the next set of items.
   */
  offset?: number;
}) =>
  axios.get<{
    albums: Pagination<Album>;
    tracks: Pagination<Track>;
    artists: Pagination<Artist>;
    playlists: Pagination<Playlist>;
  }>(`/search`, { params });
