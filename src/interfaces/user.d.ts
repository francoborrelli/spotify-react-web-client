export interface User {
  display_name?: string;
  external_urls?: {
    spotify: string;
  };
  href?: string;
  id?: string;
  images?: [
    {
      url: string;
      height: number;
      width: number;
    },
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  type?: string;
  uri?: string;
  followers?: {
    href: null;
    total: number;
  };
  country?: string;
  product?: string;
  explicit_content?: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email?: string;
}
