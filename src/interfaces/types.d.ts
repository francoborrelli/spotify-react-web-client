export type Song = {
  name: string;
  length?: string;
  artist?: string;
  imageUrl?: string;
  skills: TagType[];
  description?: string;
  experience?: string;
  relatedSongs?: Song[];
  explanation?: string;
  avatar?: any;

  type?: string;

  link?: string;
  github?: string;
  images?: string[];
  youtube?: string;
  certificate?: string;
};

export type Playlist = {
  name: string;
  description?: string;
  songs: Song[];
  color: string;
  filters?: string[];
  defaultFilter?: string;
  getImage: (lang: string) => string;
};

export type Description = {
  bulletPoints: string[];
  link?: string;
  tags?: TagType[];
};

export type User = {
  name: string;
  imageUrl?: string;
  playlists: Playlist[];
  linkedIn?: string;
  github?: string;
};

export type TagType = {
  text: string;
  color: string;
  icon?: any;
  link?: string;
  years?: string;
  experience?: string;
  image?: string;
};

export type SocialNetwork = {
  name: string;
  imageUrl: string;
  link: string;
  icon: any;
};
