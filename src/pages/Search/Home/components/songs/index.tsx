import SongView from './song';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../store/store';

export const SearchedSongs = () => {
  const { t } = useTranslation(['search']);
  const songs = useAppSelector((state) => state.search.songs);

  if (!songs || songs.length === 0) return null;

  return (
    <div className='search-songs-container'>
      <h1 className='section-title'>{t('Songs')}</h1>

      <div>
        {songs.map((song, index) => (
          <SongView song={song} key={song.id} index={index} />
        ))}
      </div>
    </div>
  );
};
