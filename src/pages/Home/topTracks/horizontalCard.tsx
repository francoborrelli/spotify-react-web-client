import { PlayCircle } from '../components/PlayCircle';

// Interfaces
import type { FC } from 'react';
import type { Track } from '../../../interfaces/track';

interface HorizontalCardProps {
  item: Track;
}

export const HorizontalCard: FC<HorizontalCardProps> = ({ item }) => {
  return (
    <div className='horizontal-playlist'>
      <div style={{ display: 'flex' }}>
        <div className='img-container'>
          <div className='img-section'>
            <img src={item.album.images[0].url} alt={item.name} />
          </div>
        </div>
      </div>

      <div className='text-container'>
        <div className='text-section'>
          <div>
            <a draggable='false' title={item.name} href='/'>
              <p>{item.name}</p>
            </a>
          </div>
        </div>

        <div className='button-container'>
          <PlayCircle size={15} />
        </div>
      </div>
    </div>
  );
};
