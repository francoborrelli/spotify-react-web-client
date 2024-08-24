/* eslint-disable jsx-a11y/anchor-is-valid */

import { Avatar } from 'antd';
import { Play } from '../../components/Icons';
import { Tooltip } from '../../components/Tooltip';
import { useCallback, useState } from 'react';

// Interfaces
import type { Song } from '../../interfaces/types';

// Redux
import { useAppDispatch } from '../../store/store';
import { libraryActions } from '../../store/slices/library';

// Utils
import { useTranslation } from 'react-i18next';

interface SongViewProps {
  song: Song;
  index: number;
  hasSkills: boolean;
}
interface SongDataProps extends SongViewProps {
  isOpen: boolean;
}

const SongData = ({ song, index, hasSkills }: SongDataProps) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['cv']);

  const image = song.avatar || (
    <img src={song.imageUrl} alt='song cover' className='w-10 h-10 mr-4 rounded-md' />
  );

  const title = (
    <div className='flex flex-col' style={{ flex: hasSkills ? 6 : 10 }}>
      <div className='flex flex-row items-center'>
        <p className='title text-left'>{t(song.name)}</p>
      </div>
      <a
        target='_blank'
        href={song.link}
        onClick={(e) => {
          e.stopPropagation();
        }}
        rel='noreferrer'
      >
        <p className='text-left artist'>{t(song.artist || '')}</p>
      </a>
    </div>
  );

  const tags = (
    <div
      style={{ flex: 4 }}
      className='tablet-hidden flex flex-row items-center justify-start flex-wrap space-x-2'
    >
      <Avatar.Group
        max={{
          count: 2,
          style: {
            color: '1cb955',
            fontWeight: 700,
            cursor: 'pointer',
            backgroundColor: '#1d1d1d',
          },
        }}
      >
        {(song.skills || []).map((tag) => (
          <Tooltip title={tag.text} placement='top' key={tag.text}>
            <Avatar key={tag.text} style={{ backgroundColor: '#5c5c5c26' }} icon={tag.icon} />
          </Tooltip>
        ))}
      </Avatar.Group>
    </div>
  );

  const time = (
    <p className='text-right' style={{ flex: 4 }}>
      {t(song.length!)}
    </p>
  );

  return (
    <div
      className='song-details flex flex-row items-center w-full songDetails'
      onClick={() => {
        dispatch(libraryActions.setSongPlaying(song));
      }}
    >
      <div className='flex flex-row items-center justify-between w-full'>
        <div style={{ flex: 1 }} className='mobile-hidden'>
          <p className='song-details-index'>{index + 1}</p>
          <p className='song-details-play'>
            <Play />
          </p>
        </div>
        {image}
        {title}
        {tags}
        {time}
      </div>
    </div>
  );
};

const SongView = ({ song, index, hasSkills }: SongViewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  return (
    <button
      key={song.name}
      className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center p-2 rounded-lg ${
        isOpen ? 'expanded' : ''
      }`}
      onClick={toggleOpen}
    >
      <SongData song={song} hasSkills={hasSkills} isOpen={isOpen} index={index} />
    </button>
  );
};

export default SongView;
