import { FC, memo, useCallback } from 'react';

import { DetailsCard } from './card';
import { Play } from '../../../../Icons';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { uiActions } from '../../../../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

// Services
import { playerService } from '../../../../../services/player';

// Interfaces
import type { Track } from '../../../../../interfaces/track';

export const NextInQueue: FC = memo(() => {
  const [t] = useTranslation(['playingBar']);
  const dispatch = useAppDispatch();

  const item = useAppSelector(
    (state) => state.queue.queue[0],
    (prev, next) => prev?.id === next?.id
  ) as any as Track;

  const onClick = useCallback(() => {
    playerService.nextTrack();
  }, []);

  if (!item) return null;

  return (
    <DetailsCard
      title={t('Next in queue')}
      extra={
        <button
          onClick={() => {
            dispatch(uiActions.toggleQueue());
          }}
          className='link-button'
        >
          {t('Open Queue')}
        </button>
      }
    >
      <div className='queue-song' onDoubleClick={onClick}>
        <div className=' flex flex-row items-center'>
          <div className='queue-song-image-container'>
            <div className='queue-song-overlay' onClick={onClick}>
              <Play />
            </div>
            <img
              alt={item.album?.name || ''}
              className='album-cover'
              src={item.album?.images[0].url}
            />
          </div>

          <div id='song-and-artist-name'>
            <p className='text-white font-bold song-title' title={item.name}>
              {item.name}
            </p>
            <p className='song-artist' title={item.artists?.map((a) => a.name).join(', ') || ''}>
              {item.artists
                ?.slice(0, 3)
                .map((a) => a.name)
                .join(', ') || ''}
            </p>
          </div>
        </div>
      </div>
    </DetailsCard>
  );
});
