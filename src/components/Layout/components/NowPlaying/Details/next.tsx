import { FC, memo } from 'react';
import { Play } from '../../../../Icons';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { Track } from '../../../../../interfaces/track';
import { DetailsCard } from './card';
import { uiActions } from '../../../../../store/slices/ui';

export const NextInQueue: FC = memo(() => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector((state) => state.queue.queue);

  const item = queue[0] as any as Track;
  if (!item) return null;

  return (
    <DetailsCard
      title='Next in queue'
      extra={
        <button
          onClick={() => {
            dispatch(uiActions.toggleQueue());
          }}
          className='link-button'
        >
          Open Queue
        </button>
      }
    >
      <div className='queue-song'>
        <div className=' flex flex-row items-center'>
          <div className='queue-song-image-container'>
            <div className='queue-song-overlay'>
              <Play />
            </div>
            <img alt='Album Cover' className='album-cover' src={item.album.images[0].url} />
          </div>

          <div id='song-and-artist-name'>
            <p className='text-white font-bold song-title' title={item.name}>
              {item.name}
            </p>
            <p className='song-artist' title={item.artists.map((a) => a.name).join(', ')}>
              {item.artists
                .slice(0, 3)
                .map((a) => a.name)
                .join(', ')}
            </p>
          </div>
        </div>
      </div>
    </DetailsCard>
  );
});
