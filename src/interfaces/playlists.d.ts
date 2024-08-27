import { Track } from './track';
import type { User } from './user';

export interface Playlist {
  /**
   * @description true if the owner allows other users to modify the playlist.
   */
  collaborative: boolean;

  /**
   * @description The playlist description. Only returned for modified, verified playlists, otherwise null.
   * @nullable
   * @example "Get happy with this pick-me-up playlist."
   * @type string
   */
  description: string | null;

  /**
   * @description A link to the Web API endpoint providing full details.
   */
  external_urls: {
    spotify: string;
  };

  /**
   * @description A link to the Web API endpoint providing full details.
   */
  href: string;

  /**
   * @description The Spotify ID for the playlist.
   * @example "37i9dQZF1DXcBWIGoYBM5M"
   * @type string
   * @pattern ^[a-zA-Z0-9]+$
   */
  id: string;

  /**
   * @description Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See Working with Playlists. Note: If returned, the source URL for the image (url) is temporary and will expire in less than a day.
   * @nullable
   * @type Image[]
   * @items
   * @maxItems 3
   * @minItems 0
   * @uniqueItems true
   */
  images: {
    url: string;
    height: number;
    width: number;
  }[];

  /**
   * @description Followers object
   */
  followers: {
    href: string;
    total: number;
  };

  /**
   * @description The name of the playlist.
   * @example "Today's Top Hits"
   * @type string
   */
  name: string;

  /**
   * @description The user who owns the playlist
   * @type User
   * @nullable
   */
  owner: User | null;

  /**
   * @description true if the playlist is public, false if it is private, null if not relevant.
   * @nullable
   * @type boolean
   */
  public: boolean | null;

  /**
   * @description The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version.
   * @example "7c9b1b4e"
   */
  snapshot_id: string;

  /**
   * @description Information about the tracks of the playlist.
   * @nullable
   */
  tracks: {
    href: string;
    total: number;
  } | null;

  /**
   * @description The object type: "playlist"
   */
  type: 'playlist';

  /**
   * @description The Spotify URI for the playlist.
   * @example "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
   * @type string
   */
  uri: string;
}

export interface PlaylistItem {
  added_at: string;
  added_by: User;
  is_local: boolean;
  primary_color: string;
  track: Track;
}

export interface PlaylistItemWithSaved extends PlaylistItem {
  saved: boolean;
}
