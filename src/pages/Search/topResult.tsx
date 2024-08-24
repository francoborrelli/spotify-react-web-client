// Components
import { PlayCircle } from '../Home/PlayCircle';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useAppDispatch } from '../../store/store';
import { libraryActions } from '../../store/slices/library';

// Interfaces
import type { SearchResult } from '.';
import { useNavigate } from 'react-router-dom';

export const TopResult = ({ item }: { item: SearchResult }) => {
  const { t } = useTranslation(['search']);
  return (
    <div className='top-result-container'>
      <h1 className='section-title'>{t('Top Result')}</h1>
      <TopResultSong item={item} />
    </div>
  );
};

export const TopResultSong = ({ item, onClick }: { item: SearchResult; onClick?: () => void }) => {
  const [t] = useTranslation(['cv']);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const title = t(item.name);
  const description = `${t(item.artist!)} • ${t(item.playlist)}`;

  return (
    <div
      style={{ cursor: 'pointer' }}
      className='playlist-card relative rounded-lg overflow-hidden  hover:bg-spotify-gray-lightest transition'
      onClick={() => {
        navigate(`/playlist/${item.playlist.toLowerCase()}`);
      }}
    >
      <div
        style={{ position: 'relative' }}
        className='md:aspect-w-1 md:aspect-h-1/2 lg:aspect-w-1 lg:aspect-h-3/4 xl:aspect-w-1 xl:aspect-h-4/5 p-4'
      >
        <img alt='' src={item.imageUrl} />
      </div>
      <div className='playlist-card-info'>
        <h3 className='text-md font-semibold text-white'>{title}</h3>
        <p>{description}</p>
      </div>
      <div className='circle-play-div transition translate-y-1/4'>
        <PlayCircle
          onClick={(e) => {
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            dispatch(libraryActions.setSongPlaying(item));
          }}
        />
      </div>
    </div>
  );
};

export default TopResultSong;
