import { useAppSelector } from '../../../../store/store';
import SongView from './song';
import { useTranslation } from 'react-i18next';

export const Songs = () => {
  const { t } = useTranslation(['profile']);
  const songs = useAppSelector((state) => state.profile.songs);

  if (!songs || songs.length === 0) return null;

  return (
    <div className='search-songs-container'>
      <h1 className='playlist-header'>{t('Top tracks this month')}</h1>
      <h2 className='playlist-subheader'>{t('Only visible to you')}</h2>

      <div>
        {songs.slice(0, 5).map((song, index) => (
          <SongView song={song} key={song.id} index={index} />
        ))}
      </div>
    </div>
  );
};
