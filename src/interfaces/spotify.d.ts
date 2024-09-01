import type { Track } from './track';
import type { Device } from './devices';

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
