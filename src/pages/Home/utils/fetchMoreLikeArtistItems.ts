import shuffle from 'lodash/shuffle';

import { artistService } from '../../../services/artist';
import { querySearch } from '../../../services/search';

import type { Album } from '../../../interfaces/albums';
import type { Artist } from '../../../interfaces/artist';
import type { Playlist } from '../../../interfaces/playlists';

export type MoreLikeItem = Playlist | Album | Artist;

const uniqById = <T extends { id: string }>(items: T[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

export const fetchMoreLikeArtistItems = async (artist: Artist): Promise<MoreLikeItem[]> => {
  const [playlistSearch, albumsRes, relatedRes] = await Promise.all([
    querySearch({ q: artist.name, type: 'playlist', limit: 8 }),
    artistService.fetchArtistAlbums(artist.id, {
      limit: 6,
      include_groups: 'album',
    }),
    artistService.fetchSimilarArtists(artist.id),
  ]);

  const relatedArtists = (relatedRes.data.artists ?? [])
    .filter((relatedArtist) => relatedArtist.id !== artist.id)
    .slice(0, 6);
  const playlists = playlistSearch.data.playlists?.items ?? [];
  const albums = albumsRes.data.items ?? [];

  return shuffle(uniqById([...relatedArtists, ...playlists, ...albums])).slice(0, 12);
};
