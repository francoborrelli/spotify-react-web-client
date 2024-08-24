/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCallback, useState } from 'react';

// Interfaces
import type { SearchResult } from '.';

// Redux
import { useAppDispatch } from '../../store/store';
import { libraryActions } from '../../store/slices/library';

// Utils
import { useTranslation } from 'react-i18next';

interface SongViewProps {
  song: SearchResult;
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
    <img src={song.imageUrl} alt='song cover' className='w-10 h-10 rounded-md' />
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
        <p className='text-left artist'>
          {t(song.artist || 'Skill')} • {t(song.playlist)}
        </p>
      </a>
    </div>
  );

  const button = (
    <button className='image-button'>
      <svg
        data-encore-id='icon'
        role='img'
        height={16}
        width={16}
        fill='white'
        aria-hidden='true'
        className='Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq'
        viewBox='0 0 24 24'
      >
        <path d='m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z'></path>
      </svg>
    </button>
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
        <div style={{ position: 'relative' }} className={'mr-4'}>
          <div style={{ marginRight: song.avatar ? -15 : undefined }}>{image}</div>
          {button}
        </div>
        {title}
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
