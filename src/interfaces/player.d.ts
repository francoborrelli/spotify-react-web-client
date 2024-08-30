import { Track } from './track';

export interface PlayHistoryObject {
  track: Track;

  played_at: string;

  context: {
    type: 'artist' | 'playlist' | 'album' | 'show' | 'episode' | 'user' | 'track';
    href: string;
    uri: string;
  };
}
