import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query data layer.
//
// Endpoints wrap the existing service functions (src/services/*) via `queryFn`, so they reuse the
// axios transport — concurrency limiter, 429 backoff, auth/refresh, and the IndexedDB URL cache —
// without re-implementing any endpoint logic. RTK Query adds request dedup, stale-while-
// revalidate caching, and tag-based invalidation on top. Endpoints are injected per-domain via
// `api.injectEndpoints` (see src/store/endpoints/*).

export type ApiError = { status?: number; data?: unknown };

// Standardizes turning a service call (which resolves to an axios-style `{ data }`) into the
// `{ data } | { error }` shape RTK Query's queryFn expects.
export const runQuery = async <T>(
  fn: () => Promise<{ data: T }>
): Promise<{ data: T } | { error: ApiError }> => {
  try {
    const res = await fn();
    return { data: res.data };
  } catch (e: any) {
    return {
      error: { status: e?.response?.status, data: e?.response?.data ?? e?.message } as ApiError,
    };
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery<ApiError>(),
  tagTypes: [
    'Artist',
    'Album',
    'Playlist',
    'Track',
    'Me',
    'SavedTracks',
    'SavedAlbums',
    'FollowedArtists',
    'MyPlaylists',
    'Saved',
  ],
  // Catalog data dominates and is immutable, so default to a long cache lifetime; mutable
  // endpoints override `keepUnusedDataFor` and opt into refetch-on-focus per hook.
  keepUnusedDataFor: 60 * 60 * 24,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
