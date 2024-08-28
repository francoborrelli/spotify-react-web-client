import type { SimpleArtist } from './artist';

export interface Album {
  /** @description The type of the album. */
  album_type: 'album' | 'single' | 'compilation';

  /** @description The artists of the album. Each artist object includes a link in href to more detailed information about the artist. */
  artists: SimpleArtist[];

  /** @description The markets in which the album is available: ISO 3166-1 alpha-2 country codes. NOTE: an album is considered available in a market when at least 1 of its tracks is available in that market. */
  available_markets: string[];

  /** @description Known external URLs for this album. */
  external_urls: {
    spotify: string;
  };

  /** @description A link to the Web API endpoint providing full details of the album. */
  href: string;

  /** @description The Spotify ID for the album. */
  id: string;

  /** @description The cover art for the album in various sizes, widest first. */
  images: {
    url: string;
    width: number;
    height: number;
  }[];

  /** @description The name of the album. In case of an album takedown, the value may be an empty string. */
  name: string;

  /** @description The date the album was first released. */
  release_date: string;

  /** @description The precision with which release_date value is known. */
  release_date_precision: 'year' | 'month' | 'day';

  /** @description The number of tracks in the album.. */
  total_tracks: number;

  /** @description The object type. */
  type: 'album';

  /** @description The Spotify URI for the album. */
  uri: string;
}

interface AlbumFullObject extends Album {
  /** @description The tracks of the album. */
  tracks: Track[];
}
