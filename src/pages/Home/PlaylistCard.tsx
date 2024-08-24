import { PlayCircle } from './PlayCircle';

import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/store';

import type { Playlist } from '../../interfaces/types';

const PlaylistCard = ({ playlist, onClick }: { playlist: Playlist; onClick: () => void }) => {
  const [t] = useTranslation(['cv']);
  const [tpy] = useTranslation(['playlist']);

  const title = t(playlist.name);
  const language = useAppSelector((state) => state.language.language);
  const description = `Playlist • ${playlist.songs.length} ${tpy('songs')}`;

  return (
    <div
      style={{ cursor: 'pointer' }}
      className='playlist-card relative rounded-lg overflow-hidden  hover:bg-spotify-gray-lightest transition'
      onClick={onClick}
    >
      <div
        style={{ position: 'relative' }}
        className='aspect-square md:aspect-w-1 md:aspect-h-1/2 lg:aspect-w-1 lg:aspect-h-3/4 xl:aspect-w-1 xl:aspect-h-4/5 p-4'
      >
        <img src={playlist.getImage(language)} alt='' style={{ borderRadius: 5, width: '100%' }} />
        <div className='circle-play-div transition translate-y-1/4'>
          <PlayCircle />
        </div>
      </div>
      <div className='playlist-card-info'>
        <h3 className='text-md font-semibold text-white'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
