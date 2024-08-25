import { FC } from 'react';
import { Space } from 'antd';
import { PlayCircle } from '../PlayCircle';

// Interfaces
import type { Track } from '../../../interfaces/track';

interface HorizontalCardProps {
  item: Track;
}

export const HorizontalCard: FC<HorizontalCardProps> = ({ item }) => {
  return (
    <a className='horizontal-playlist-link' target='_blank' rel='noreferrer'>
      <div className='horizontal-playlist'>
        <Space style={{ width: '50%' }}>
          <img width='60' src={item.album.images[0].url} alt='album cover'></img>
          <h3
            style={{
              wordBreak: 'break-all',
              whiteSpace: 'pre',
              overflow: 'hidden',
            }}
            className='text-md font-semibold text-white'
          >
            {item.name}
          </h3>
        </Space>
        <PlayCircle />
      </div>
    </a>
  );
};
