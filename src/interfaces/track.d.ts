import type { Album } from './albums';
import type { SimpleArtist } from './artist';

export interface Track {
  /** @description The album on which the track appears. The album object includes a link in href to full information about the album. */
  album: Album;

  /** @description The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist */
  artists: SimpleArtist[];

  /** @description A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code. */
  available_markets: string[];

  /** @description The disc number (usually 1 unless the album consists of more than one disc). */
  disc_number: number;

  /** @description The track length in milliseconds. */
  duration_ms: number;

  /** @description Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown). */
  explicit: boolean;

  /** @description Known external IDs for the track. */
  external_ids: {
    isrc: string;
  };

  /** @description Known external URLs for this track. */
  external_urls: {
    /** @description The Spotify URL for the object. */
    spotify: string;
  };

  /** @description A link to the Web API endpoint providing full details of the track. */
  href: string;

  /** @description The Spotify ID for the track. */
  id: string;

  /** @description Whether or not the track is from a local file. */
  is_local: false;

  /** @description Part of the response when Track Relinking is applied. If true, the track is playable in the given market. Otherwise false. */
  is_playable: boolean;

  /** @description The name of the track. */
  name: string;

  /** @description The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The track's popularity is calculated from the popularity of all the track's album. */
  popularity: number;

  /** @description A URL to a 30 second preview (MP3 format) of the track. */
  preview_url: string;

  /** @description The number of the track. If an album has several discs, the track number is the number on the specified disc. */
  track_number: number;

  /** @description The object type. */
  type: 'track';

  /** @description The Spotify URI for the track. */
  uri: string;
}

export interface TrackWithSave extends Track {
  saved: boolean;
}
