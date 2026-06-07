import { api, runQuery } from '../api';

import { artistService } from '../../services/artist';
import { userService } from '../../services/users';
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

import type { RootState } from '../store';
import type { Album, AlbumFullObject } from '../../interfaces/albums';
import type { Track } from '../../interfaces/track';
import type { User } from '../../interfaces/user';
import type { Playlist, PlaylistItem } from '../../interfaces/playlists';
import type { ArtistPageData } from '../slices/artist';
import type { AlbumPageData } from '../slices/album';
import type { PlaylistPageData } from '../slices/playlist';

// Catalog (mostly immutable) page queries. Each endpoint's queryFn composes the existing service
// calls — identical to what the old page thunks did — so RTK Query adds caching/dedup/SWR on top
// without re-implementing endpoint logic. Long `keepUnusedDataFor` (the api default) means
// revisiting a page within the session does zero network calls.

const catalogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getArtistPage: build.query<ArtistPageData, string>({
      async queryFn(id, { getState }) {
        return runQuery(async () => {
          const user = (getState() as RootState).auth.user;

          const [artistRes, followingRes, topRes, albumsRes, otherRes] = await Promise.all([
            artistService.fetchArtist(id),
            user
              ? userService.checkFollowingArtists([id])
              : Promise.resolve({ data: [false] as boolean[] }),
            artistService.fetchArtistTopTracks(id),
            artistService.fetchArtistAlbums(id, {
              limit: 50,
              include_groups: 'album,single,appears_on,compilation' as any,
            }),
            artistService.fetchSimilarArtists(id),
          ]);

          const tracks = (topRes.data as any).tracks as Track[];
          const saved = tracks.length
            ? (
                (await userService
                  .checkSavedTracks(tracks.map((t) => t.id))
                  .catch(() => ({ data: [] as boolean[] }))) as { data: boolean[] }
              ).data
            : [];

          const all = (albumsRes.data.items as Album[]) ?? [];

          return {
            data: {
              artist: artistRes.data,
              following: (followingRes.data as boolean[])[0],
              topTracks: tracks.map((t, i) => ({ ...t, saved: saved[i] })),
              albums: all.filter((a) => a.album_type === 'album'),
              singles: all.filter((a) => a.album_type === 'single'),
              compilations: all.filter((a) => a.album_type === 'compilation'),
              appearsOn: [],
              otherArtists: otherRes.data.artists ?? [],
            } satisfies ArtistPageData,
          };
        });
      },
      providesTags: (_res, _err, id) => [{ type: 'Artist', id }],
    }),

    getAlbumPage: build.query<AlbumPageData, string>({
      async queryFn(id, { getState }) {
        return runQuery(async () => {
          const user = (getState() as RootState).auth.user;

          const [albumRes, tracksRes, followingRes] = await Promise.all([
            albumsService.fetchAlbum(id),
            albumsService.fetchAlbumTracks(id, { limit: 50 }),
            user
              ? userService.checkFollowingArtists([id])
              : Promise.resolve({ data: [false] as boolean[] }),
          ]);

          const album = albumRes.data as AlbumFullObject;
          const items = (tracksRes.data.items as Track[]) ?? [];

          const [savedRes, artistRes, otherRes] = await Promise.all([
            userService.checkSavedTracks(items.map((t) => t.id)).catch(() => ({ data: [] as boolean[] })),
            artistService.fetchArtist(album.artists[0].id),
            artistService.fetchArtistAlbums(album.artists[0].id, { limit: 10 }),
          ]);

          const saved = savedRes.data as boolean[];

          return {
            data: {
              album,
              tracks: items.map((t, i) => ({ ...t, saved: saved[i] })),
              following: (followingRes.data as boolean[])[0],
              artist: artistRes.data,
              otherAlbums: (otherRes.data.items as Album[]) ?? [],
            } satisfies AlbumPageData,
          };
        });
      },
      providesTags: (_res, _err, id) => [{ type: 'Album', id }],
    }),

    getPlaylistPage: build.query<PlaylistPageData, string>({
      async queryFn(id, { getState }) {
        return runQuery(async () => {
          const user = (getState() as RootState).auth.user;

          const [plRes, itemsRes, followingRes] = await Promise.all([
            playlistService.getPlaylist(id),
            // Feb 2026: GET /playlists/{id}/items is owner/collaborator-only — it 403s for
            // editorial/other-users' playlists. Degrade to an empty track list (metadata from
            // getPlaylist still renders) instead of failing the whole page.
            playlistService
              .getPlaylistItems(id)
              .catch(() => ({ data: { items: [] as PlaylistItem[] } as any })),
            user
              ? userService.checkFollowedPlaylist(id)
              : Promise.resolve({ data: [false] as boolean[] }),
          ]);

          const playlist = plRes.data as Playlist;
          const items = (itemsRes.data.items as PlaylistItem[]) ?? [];
          const ids = items.map((i) => i.track.id);
          const artistsIds = items.map((i) => i.track.artists[0].id);
          const isMine = user?.id === playlist.owner?.id;

          const [savedRes, recRes] = await Promise.all([
            ids.length && user
              ? userService.checkSavedTracks(ids).catch(() => ({ data: [] as boolean[] }))
              : Promise.resolve({ data: [] as boolean[] }),
            isMine
              ? ids.length
                ? playlistService
                    .getRecommendations({
                      seed_tracks: ids.slice(0, 5).join(',') || undefined,
                      seed_artists: artistsIds.slice(0, 5).join(',') || undefined,
                      limit: 25,
                    })
                    .then((r) => ({ data: r.data.tracks }))
                    .catch(() => ({ data: [] as Track[] }))
                : userService
                    .fetchTopTracks({ limit: 25, timeRange: 'short_term' })
                    .then((r) => ({ data: r.data.items as Track[] }))
              : Promise.resolve({ data: [] as Track[] }),
          ]);

          const saved = savedRes.data as boolean[];

          return {
            data: {
              playlist,
              tracks: items.map((item, i) => ({ ...item, saved: saved[i] })),
              following: (followingRes.data as boolean[])[0],
              canEdit: isMine || playlist.collaborative,
              user: (playlist.owner ?? null) as User | null,
              recommendations: recRes.data as Track[],
            } satisfies PlaylistPageData,
          };
        });
      },
      // Playlists are mutable (edits/follow), so keep a short cache and revalidate.
      keepUnusedDataFor: 120,
      providesTags: (_res, _err, id) => [{ type: 'Playlist', id }],
    }),
  }),
});

export const { useGetArtistPageQuery, useGetAlbumPageQuery, useGetPlaylistPageQuery } = catalogApi;
