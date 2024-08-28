export interface Category {
  /** @description A link to the Web API endpoint returning full details of the category. */
  href: string;

  /** @description The category icon, in various sizes. */
  icons: {
    /** @description The source URL of the image. */
    url: string;

    /** @description The image width in pixels. */
    width: number;

    /** @description The image height in pixels. */
    height: number;
  }[];

  /** @description The Spotify category ID of the category. */
  id: string;

  /** @description The name of the category. */
  name: string;
}
