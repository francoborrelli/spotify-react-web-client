import { FC } from 'react';
import { SearchResult } from '.';
import SongView from './song';
import { useTranslation } from 'react-i18next';

export const SearchedSongs: FC<{ songs: SearchResult[] }> = (props) => {
  const { songs } = props;
  const { t } = useTranslation(['search']);

  return (
    <div className='search-songs-container'>
      <h1 className='section-title'>{t('Songs')}</h1>

      <div>
        {songs.map((song, index) => (
          <SongView song={song} key={song.name} index={index} hasSkills={false} />
        ))}
      </div>
    </div>
  );
};
