export interface Artist {
  /** @description Known external URLs for this artist. */
  external_urls: {
    /** @description The Spotify URL for the object. */
    spotify: string;
  };

  /** @description Information about the followers of the artist. */
  followers: {
    /** @description This will always be set to null, as the Web API does not support it at the moment. */
    href: string;

    /** @description The total number of followers. */
    total: number;
  };

  /**
   * @description A list of the genres the artist is associated with. If not yet classified, the array is empty.
   * @example ["Prog rock","Grunge"]
   */
  genres: string[];

  /** @description A link to the Web API endpoint providing full details of the artist. */
  href: string;

  /** @description The Spotify ID for the artist. */
  id: string;

  /** @description Images of the artist in various sizes, widest first. */
  images: {
    url: string;
    height: number;
    width: number;
  }[];

  /** @description The name of the artist. */
  name: string;

  /** @description The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks. */
  popularity: number;

  /** @description The object type. */
  type: 'artist';

  /** @description The Spotify URI for the artist. */
  uri: string;
}

export type SimpleArtist = Pick<Artist, 'external_urls' | 'id' | 'href' | 'name' | 'type' | 'uri'>;
