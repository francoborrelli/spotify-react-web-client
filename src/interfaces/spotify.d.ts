import { Track } from './track';

export interface Device {
  /** @description The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached device_id should periodically be cleared out and refetched as necessary. */
  id: string;

  /** @description If this device is the currently active device. */
  is_active: boolean;

  /** @description If this device is currently in a private session. */
  is_private_session: boolean;

  /** @description Whether controlling this device is restricted. At present if this is “true” then no Web API commands will be accepted by this device. */
  is_restricted: boolean;

  /** @description The name of the device. */
  name: string;

  /** @description Device type, such as “Computer”, “Smartphone” or “Speaker”. */
  type: string;

  /** @description The current volume in percent. Range: 0 - 100  */
  volume_percent: number;
}

export interface SpotifyPlaybackState {
  /** @description The device that is currently active. */
  device: Device;

  /** @description If shuffle is on or off. */
  shuffle_state: boolean;

  smart_shuffle: boolean;

  /** @description The repeat state. */
  repeat_state: 'context' | 'off' | 'track';

  /** @description Unix Millisecond Timestamp when playback state was last changed (play, pause, skip, scrub, new song, etc.). */
  timestamp: number;

  /** @description A Context Object. Can be null. */
  context: {
    /** @description Known external URLs for this context. */
    external_urls: {
      spotify: string;
    };

    /** @description A link to the Web API endpoint providing full details of the track. */
    href: string;

    /** @description The object type, e.g. "artist", "playlist", "album", "show". */
    type: 'playlist' | 'album' | 'artist' | 'show';

    /** @description The Spotify URI for the context. */
    uri: string;
  } | null;

  /** @description Progress into the currently playing track or episode. Can be null.. */
  progress_ms: number | null;

  /** @description The currently playing track or episode. Can be null. */
  item: Track | null;

  /** @description If something is currently playing, return true. */
  is_playing: boolean;
}
