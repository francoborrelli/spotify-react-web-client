export interface Episode {
  /** @description A URL to a 30 second preview (MP3 format) of the episode. null if not available. */
  audio_preview_url: string | null;

  /** @description A description of the episode. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed. */
  description: string;

  /** @description A description of the episode. This field may contain HTML tags. */
  html_description: string;

  /** @description The episode length in milliseconds. */
  duration_ms: number;

  /** @description Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
  explicit: boolean;

  /** @description Known external URLs for this episode. */
  external_urls: {
    spotify: string;
  };

  /** @description A link to the Web API endpoint providing full details of the episode. */
  href: string;

  /** @description The Spotify ID for the episode. */
  id: string;

  /** @description The cover art for the episode in various sizes, widest first. */
  images: {
    url: string;
    height: number;
    width: number;
  }[];

  /** @description True if the episode is hosted outside of Spotify’s CDN. */
  is_externally_hosted: boolean;

  /** @description True if the episode is playable in the given market. Otherwise false. */
  is_playable: boolean;

  /**
   * @description The language used in the episode, identified by a ISO 639 code. This field is deprecated and might be removed in the future. Please use the languages field instead.
   * @deprecated
   */
  language: string;

  /** @description A list of the languages used in the episode, identified by their ISO 639 code. */
  languages: string[];

  /** @description The name of the episode. */
  name: string;

  /** @description The date the episode was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12". */
  release_date: string;

  /** @description The precision with which release_date value is known: "year", "month", or "day". */
  release_date_precision: string;

  /** @description The user’s most recent position in the episode. Set if the supplied access token is a user token and has the scope user-read-playback-position. */
  resume_point: {
    /** @description Whether or not the episode has been fully played by the user. */
    fully_played: boolean;

    /** @description The user’s most recent position in the episode in milliseconds. */
    resume_position_ms: number;
  };

  /** @description The object type: “episode”. */
  type: '“episode”';

  /** @description The Spotify URI for the episode. */
  uri: string;

  /** @description Restrictions of the episode. */
  restrictions: {
    reason: string;
  };

  /** @description The show on which the episode belongs. */
  show: {
    /** @description A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code. */
    available_markets: string[];

    /** @description The copyright information of the show. */
    copyrights: {
      text: string;
      type: string;
    }[];

    /** @description A description of the show. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed. */
    description: string;

    /** @description A description of the show. This field may contain HTML tags. */
    html_description: string;

    /** @description Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown). */
    explicit: boolean;

    /** @description Known external URLs for this show. */
    external_urls: {
      spotify: string;
    };

    /** @description A link to the Web API endpoint providing full details of the show. */
    href: string;

    /** @description The Spotify ID for the show. */
    id: string;

    /** @description The cover art for the show in various sizes, widest first. */
    images: {
      url: string;
      height: number;
      width: number;
    }[];

    /** @description A list of the languages used in the show, identified by their ISO 639 code. */
    languages: string[];

    /** @description The media type of the show. */
    media_type: string;

    /** @description The name of the show. */
    name: string;

    /** @description The publisher of the show. */
    publisher: string;

    /** @description The object type: “show”. */
    type: 'show';

    /** @description The Spotify URI for the show. */
    uri: string;

    /** @description The total number of episodes in the show. */
    total_episodes: number;
  };
}
