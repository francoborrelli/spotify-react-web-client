import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CloseIcon2, VerifiedIcon } from '../../../Icons';
import { ARTISTS_DEFAULT_IMAGE, PLAYLIST_DEFAULT_IMAGE } from '../../../../constants/spotify';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { searchHistoryActions } from '../../../../store/slices/searchHistory';
import { playerService } from '../../../../services/player';
import { uiActions } from '../../../../store/slices/ui';

import type { Album } from '../../../../interfaces/albums';
import type { Artist } from '../../../../interfaces/artist';
import type { Playlist } from '../../../../interfaces/playlists';
import type { Track } from '../../../../interfaces/track';

type HistoryItem = Playlist | Album | Track | Artist;

const PlayIcon = (
  <svg data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 24 24'>
    <path d='m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z'></path>
  </svg>
);

const PauseIcon = (
  <svg data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 24 24'>
    <path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
  </svg>
);

const getItemImage = (item: HistoryItem) => {
  if (item.type === 'track') return item.album.images[0]?.url || PLAYLIST_DEFAULT_IMAGE;
  if (item.type === 'artist') return item.images[0]?.url || ARTISTS_DEFAULT_IMAGE;
  return item.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE;
};

const getItemPath = (item: HistoryItem) => {
  if (item.type === 'artist') return `/artist/${item.id}`;
  if (item.type === 'album') return `/album/${item.id}`;
  if (item.type === 'playlist') return `/playlist/${item.id}`;
  return `/album/${item.album.id}`;
};

const getPlayContext = (item: HistoryItem) => {
  if (item.type === 'track') return { uris: [item.uri] };
  return { context_uri: item.uri };
};

const RecentSearchRow = memo(
  ({
    item,
    subtitle,
    onSelect,
    onDelete,
  }: {
    item: HistoryItem;
    subtitle: string;
    onSelect: (item: HistoryItem) => void;
    onDelete: (item: HistoryItem) => void;
  }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => !!state.auth.user);
    const paused = useAppSelector((state) => state.spotify.state?.paused);
    const contextUri = useAppSelector((state) => state.spotify.state?.context?.uri);
    const currentUri = useAppSelector((state) => state.spotify.state?.track_window?.current_track?.uri);

    const image = getItemImage(item);
    const isCurrent =
      item.type === 'track' ? currentUri === item.uri : contextUri === item.uri;
    const isPlaying = isCurrent && !paused;

    const onPlay = (event: React.MouseEvent) => {
      event.stopPropagation();

      if (!user) {
        dispatch(uiActions.openLoginModal(image));
        return;
      }

      if (isPlaying) {
        playerService.pausePlayback();
        return;
      }

      if (isCurrent) {
        playerService.startPlayback();
        return;
      }

      playerService.startPlayback(getPlayContext(item));
    };

    return (
      <div className='recent-searches-dropdown__item' onClick={() => onSelect(item)}>
        <div
          className={`recent-searches-dropdown__media ${
            item.type === 'artist' ? 'recent-searches-dropdown__media--round' : ''
          } ${isPlaying ? 'is-playing' : ''}`}
        >
          <img src={image} alt='' className='recent-searches-dropdown__image' />
          <button
            type='button'
            className='recent-searches-dropdown__play'
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={onPlay}
          >
            {isPlaying ? PauseIcon : PlayIcon}
          </button>
        </div>

        <div className='recent-searches-dropdown__meta'>
          <div className='recent-searches-dropdown__title-row'>
            <span className='recent-searches-dropdown__title'>{item.name}</span>
            {item.type === 'artist' ? (
              <span className='recent-searches-dropdown__verified'>
                <VerifiedIcon />
              </span>
            ) : null}
          </div>
          <span className='recent-searches-dropdown__subtitle'>{subtitle}</span>
        </div>

        <button
          type='button'
          className='recent-searches-dropdown__delete'
          aria-label='Remove'
          onClick={(event) => {
            event.stopPropagation();
            onDelete(item);
          }}
        >
          <CloseIcon2 />
        </button>
      </div>
    );
  }
);

export const RecentSearchesDropdown = memo(({ onNavigate }: { onNavigate?: () => void }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['search']);
  const items = useAppSelector((state) => state.searchHistory.items);

  const getSubtitle = useCallback(
    (item: HistoryItem) => {
      if (item.type === 'artist') return t('Artist');
      if (item.type === 'album') {
        return `${t('Album')} • ${item.artists?.[0]?.name ?? ''}`;
      }
      if (item.type === 'playlist') return t('Playlist');
      return `${t('Song')} • ${item.artists.map((artist) => artist.name).join(', ')}`;
    },
    [t]
  );

  const onSelect = useCallback(
    (item: HistoryItem) => {
      dispatch(searchHistoryActions.setItem(item));
      navigate(getItemPath(item));
      onNavigate?.();
    },
    [dispatch, navigate, onNavigate]
  );

  const onDelete = useCallback(
    (item: HistoryItem) => {
      dispatch(searchHistoryActions.removeItem(item));
    },
    [dispatch]
  );

  const onClear = useCallback(() => {
    dispatch(searchHistoryActions.clearItems());
    onNavigate?.();
  }, [dispatch, onNavigate]);

  if (!items.length) return null;

  return (
    <div className='recent-searches-dropdown'>
      <h3 className='recent-searches-dropdown__heading'>{t('Recent searches')}</h3>

      <div className='recent-searches-dropdown__list'>
        {items.slice(0, 8).map((item) => (
          <RecentSearchRow
            key={`${item.type}-${item.id}`}
            item={item}
            subtitle={getSubtitle(item)}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </div>

      <button type='button' className='recent-searches-dropdown__clear' onClick={onClear}>
        {t('Clear recent searches')}
      </button>
    </div>
  );
});
