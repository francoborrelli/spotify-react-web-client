import { FC } from 'react';
import type { SocialNetwork } from '../../interfaces/types';
import { PlayCircle } from './PlayCircle';
import { Space } from 'antd';

interface PlaylistHorizontalProps {
  socialNetwork: SocialNetwork;
}

export const PlaylistHorizontal: FC<PlaylistHorizontalProps> = ({ socialNetwork }) => {
  return (
    <a
      className='horizontal-playlist-link'
      href={socialNetwork.link}
      target='_blank'
      rel='noreferrer'
    >
      <div className='horizontal-playlist'>
        <Space>
          <img width='60' src={socialNetwork.imageUrl} alt='album cover'></img>
          <h3 className='text-md font-semibold text-white'>{socialNetwork.name}</h3>
        </Space>
        <PlayCircle />
      </div>
    </a>
  );
};
