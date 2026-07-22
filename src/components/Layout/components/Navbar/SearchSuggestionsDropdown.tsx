import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AddToLibrary, SearchIcon, VerifiedIcon } from '../../../Icons';
import { ARTISTS_DEFAULT_IMAGE, PLAYLIST_DEFAULT_IMAGE } from '../../../../constants/spotify';
import { querySearch } from '../../../../services/search';
import { userService } from '../../../../services/users';
import { searchHistoryActions } from '../../../../store/slices/searchHistory';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';

import type { Artist } from '../../../../interfaces/artist';
import type { Track } from '../../../../interfaces/track';

export type SuggestionEntry =
  | { kind: 'query'; id: string; text: string }
  | { kind: 'artist'; id: string; artist: Artist }
  | { kind: 'track'; id: string; track: Track };

const highlightMatch = (text: string, query: string) => {
  const q = query.trim();
  if (!q) return text;

  const index = text.toLowerCase().indexOf(q.toLowerCase());
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <strong>{text.slice(index, index + q.length)}</strong>
      {text.slice(index + q.length)}
    </>
  );
};

const ArrowUpIcon = () => (
  <svg viewBox='0 0 16 16' width='12' height='12' fill='currentColor' aria-hidden>
    <path d='M7.35 2.15a.75.75 0 0 1 1.3 0l4.25 7.5A.75.75 0 0 1 12.25 11h-8.5a.75.75 0 0 1-.65-1.15l4.25-7.5z' />
  </svg>
);

const ArrowDownIcon = () => (
  <svg viewBox='0 0 16 16' width='12' height='12' fill='currentColor' aria-hidden>
    <path d='M8.65 13.85a.75.75 0 0 1-1.3 0L3.1 6.35A.75.75 0 0 1 3.75 5h8.5a.75.75 0 0 1 .65 1.35l-4.25 7.5z' />
  </svg>
);

const SuggestionsSkeleton = () => (
  <div className='search-suggestions-dropdown__skeleton'>
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className='search-suggestions-dropdown__skeleton-row'>
        <Skeleton.Avatar active size={48} shape={index < 2 ? 'circle' : 'square'} />
        <div className='search-suggestions-dropdown__skeleton-meta'>
          <Skeleton active title={{ width: index % 2 ? '55%' : '70%' }} paragraph={false} />
          <Skeleton active title={{ width: '35%' }} paragraph={false} />
        </div>
      </div>
    ))}
  </div>
);

interface SearchSuggestionsDropdownProps {
  query: string;
  isPending?: boolean;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onEntriesChange: (entries: SuggestionEntry[]) => void;
  onClose: () => void;
  onPickQuery: (text: string) => void;
}

export const SearchSuggestionsDropdown = memo(
  ({
    query,
    isPending = false,
    activeIndex,
    onActiveIndexChange,
    onEntriesChange,
    onClose,
    onPickQuery,
  }: SearchSuggestionsDropdownProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [t] = useTranslation(['search']);
    const user = useAppSelector((state) => !!state.auth.user);

    const [loading, setLoading] = useState(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [followed, setFollowed] = useState<Record<string, boolean>>({});
    const [saved, setSaved] = useState<Record<string, boolean>>({});
    const followOverridesRef = useRef<Record<string, boolean>>({});
    const savedOverridesRef = useRef<Record<string, boolean>>({});

    useEffect(() => {
      followOverridesRef.current = {};
      savedOverridesRef.current = {};
    }, [query]);

    useEffect(() => {
      let cancelled = false;
      const q = query.trim();
      if (!q) {
        setArtists([]);
        setTracks([]);
        return;
      }

      setLoading(true);
      querySearch({ q, type: 'artist,track', limit: 5 })
        .then(async (response) => {
          if (cancelled) return;
          const nextArtists = (response.data.artists?.items || []).filter(Boolean).slice(0, 3);
          const nextTracks = (response.data.tracks?.items || []).filter(Boolean).slice(0, 3);
          setArtists(nextArtists);
          setTracks(nextTracks);

          if (user && nextArtists.length) {
            try {
              const followRes = await userService.checkFollowingArtists(nextArtists.map((a) => a.id));
              if (!cancelled) {
                setFollowed((prev) => {
                  const map: Record<string, boolean> = {};
                  nextArtists.forEach((artist, index) => {
                    if (artist.id in followOverridesRef.current) {
                      map[artist.id] = followOverridesRef.current[artist.id];
                    } else if (artist.id in prev) {
                      map[artist.id] = prev[artist.id];
                    } else {
                      map[artist.id] = !!followRes.data[index];
                    }
                  });
                  return map;
                });
              }
            } catch {
              /* ignore */
            }
          }

          if (user && nextTracks.length) {
            try {
              const savedRes = await userService.checkSavedTracks(nextTracks.map((track) => track.id));
              if (!cancelled) {
                setSaved((prev) => {
                  const map: Record<string, boolean> = {};
                  nextTracks.forEach((track, index) => {
                    if (track.id in savedOverridesRef.current) {
                      map[track.id] = savedOverridesRef.current[track.id];
                    } else if (track.id in prev) {
                      map[track.id] = prev[track.id];
                    } else {
                      map[track.id] = !!savedRes.data[index];
                    }
                  });
                  return map;
                });
              }
            } catch {
              /* ignore */
            }
          }
        })
        .catch(() => {
          if (!cancelled) {
            setArtists([]);
            setTracks([]);
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });

      return () => {
        cancelled = true;
      };
    }, [query, user]);

    const querySuggestions = useMemo(() => {
      const q = query.trim().toLowerCase();
      const names = [
        ...artists.map((artist) => artist.name),
        ...tracks.map((track) => track.name),
        ...tracks.flatMap((track) => track.artists.map((artist) => artist.name)),
      ];

      const unique = Array.from(
        new Set(
          names
            .map((name) => name.trim())
            .filter((name) => name.toLowerCase().includes(q) && name.toLowerCase() !== q)
        )
      ).slice(0, 4);

      return unique.map((text) => ({ kind: 'query' as const, id: `query-${text}`, text }));
    }, [artists, tracks, query]);

    const entries = useMemo<SuggestionEntry[]>(() => {
      return [
        ...querySuggestions,
        ...artists.map((artist) => ({
          kind: 'artist' as const,
          id: `artist-${artist.id}`,
          artist,
        })),
        ...tracks.map((track) => ({
          kind: 'track' as const,
          id: `track-${track.id}`,
          track,
        })),
      ];
    }, [querySuggestions, artists, tracks]);

    useEffect(() => {
      onEntriesChange(entries);
    }, [entries, onEntriesChange]);

    const openArtist = (artist: Artist) => {
      dispatch(searchHistoryActions.setItem(artist));
      navigate(`/artist/${artist.id}`);
      onClose();
    };

    const openTrack = (track: Track) => {
      dispatch(searchHistoryActions.setItem(track));
      navigate(`/album/${track.album.id}`);
      onClose();
    };

    const toggleFollow = async (event: React.MouseEvent, artist: Artist) => {
      event.preventDefault();
      event.stopPropagation();
      if (!user) {
        dispatch(uiActions.openLoginModal(artist.images[0]?.url || ARTISTS_DEFAULT_IMAGE));
        return;
      }

      const isFollowed = !!followed[artist.id];
      const next = !isFollowed;
      followOverridesRef.current[artist.id] = next;
      setFollowed((prev) => ({ ...prev, [artist.id]: next }));
      try {
        if (isFollowed) await userService.unfollowArtists([artist.id]);
        else await userService.followArtists([artist.id]);
      } catch {
        delete followOverridesRef.current[artist.id];
        setFollowed((prev) => ({ ...prev, [artist.id]: isFollowed }));
      }
    };

    const toggleSave = async (event: React.MouseEvent, track: Track) => {
      event.preventDefault();
      event.stopPropagation();
      if (!user) {
        dispatch(uiActions.openLoginModal(track.album.images[0]?.url || PLAYLIST_DEFAULT_IMAGE));
        return;
      }

      const isSaved = !!saved[track.id];
      const next = !isSaved;
      savedOverridesRef.current[track.id] = next;
      setSaved((prev) => ({ ...prev, [track.id]: next }));
      try {
        if (isSaved) await userService.deleteTracks([track.id]);
        else await userService.saveTracks([track.id]);
      } catch {
        delete savedOverridesRef.current[track.id];
        setSaved((prev) => ({ ...prev, [track.id]: isSaved }));
      }
    };

    if (!query.trim() && !isPending) return null;

    const showSkeleton = isPending || (loading && !entries.length);

    return (
      <div className='search-suggestions-dropdown'>
        <div className='search-suggestions-dropdown__hints'>
          <div className='search-suggestions-dropdown__hint-group'>
            <span className='search-suggestions-dropdown__key'>
              <ArrowUpIcon />
            </span>
            <span className='search-suggestions-dropdown__key'>
              <ArrowDownIcon />
            </span>
            <span>{t('Navigate')}</span>
          </div>
          <div className='search-suggestions-dropdown__hint-group'>
            <span className='search-suggestions-dropdown__key search-suggestions-dropdown__key--wide'>
              Enter
            </span>
            <span>{t('Search')}</span>
          </div>
        </div>

        {showSkeleton ? <SuggestionsSkeleton /> : null}

        {!showSkeleton ? (
        <div className='search-suggestions-dropdown__list'>
          {querySuggestions.map((entry, index) => (
            <button
              key={entry.id}
              type='button'
              className={`search-suggestions-dropdown__row ${
                activeIndex === index ? 'is-active' : ''
              }`}
              onMouseEnter={() => onActiveIndexChange(index)}
              onClick={() => onPickQuery(entry.text)}
            >
              <span className='search-suggestions-dropdown__query-icon'>
                <SearchIcon style={{ height: '1rem' }} />
              </span>
              <span className='search-suggestions-dropdown__query-text'>
                {highlightMatch(entry.text, query)}
              </span>
            </button>
          ))}

          {artists.map((artist, artistIndex) => {
            const index = querySuggestions.length + artistIndex;
            return (
              <div
                key={artist.id}
                className={`search-suggestions-dropdown__row search-suggestions-dropdown__row--entity ${
                  activeIndex === index ? 'is-active' : ''
                }`}
                onMouseEnter={() => onActiveIndexChange(index)}
                onClick={() => openArtist(artist)}
              >
                <img
                  src={artist.images[0]?.url || ARTISTS_DEFAULT_IMAGE}
                  alt=''
                  className='search-suggestions-dropdown__avatar search-suggestions-dropdown__avatar--round'
                />
                <div className='search-suggestions-dropdown__meta'>
                  <div className='search-suggestions-dropdown__title-row'>
                    <span className='search-suggestions-dropdown__title'>{artist.name}</span>
                    <span className='search-suggestions-dropdown__verified'>
                      <VerifiedIcon />
                    </span>
                  </div>
                  <span className='search-suggestions-dropdown__subtitle'>{t('Artist')}</span>
                </div>
                <button
                  type='button'
                  className='search-suggestions-dropdown__follow'
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onClick={(event) => toggleFollow(event, artist)}
                >
                  {followed[artist.id] ? t('Unfollow') : t('Follow')}
                </button>
              </div>
            );
          })}

          {tracks.map((track, trackIndex) => {
            const index = querySuggestions.length + artists.length + trackIndex;
            return (
              <div
                key={track.id}
                className={`search-suggestions-dropdown__row search-suggestions-dropdown__row--entity ${
                  activeIndex === index ? 'is-active' : ''
                }`}
                onMouseEnter={() => onActiveIndexChange(index)}
                onClick={() => openTrack(track)}
              >
                <img
                  src={track.album.images[0]?.url || PLAYLIST_DEFAULT_IMAGE}
                  alt=''
                  className='search-suggestions-dropdown__avatar'
                />
                <div className='search-suggestions-dropdown__meta'>
                  <span className='search-suggestions-dropdown__title'>{track.name}</span>
                  <span className='search-suggestions-dropdown__subtitle'>
                    {t('Song')} • {track.artists.map((artist) => artist.name).join(', ')}
                  </span>
                </div>
                <button
                  type='button'
                  className='search-suggestions-dropdown__add'
                  aria-label='Save'
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  onClick={(event) => toggleSave(event, track)}
                >
                  <AddToLibrary
                    style={{
                      height: 18,
                      width: 18,
                      fill: saved[track.id] ? '#1db954' : '#fff',
                    }}
                  />
                </button>
              </div>
            );
          })}
        </div>
        ) : null}
      </div>
    );
  }
);
