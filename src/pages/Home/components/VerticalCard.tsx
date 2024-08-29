import { PlayCircle } from './PlayCircle';

// Interfaces
import type { Album } from '../../../interfaces/albums';
import type { Playlist } from '../../../interfaces/playlists';

// Redux
import { useAppSelector } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import { PlayistActionsWrapper } from '../../../components/Actions/PlaylistActions';
import { AlbumActionsWrapper } from '../../../components/Actions/AlbumActions';
import { useTranslation } from 'react-i18next';

const Card = ({
  uri,
  title,
  image,
  isCurrent,
  description,
  onClick,
}: {
  uri: string;
  image: string;
  title: string;
  isCurrent: boolean;
  description: string;
  onClick: () => void;
}) => {
  const state = useAppSelector((state) => state.spotify.state);

  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className='playlist-card relative rounded-lg overflow-hidden  hover:bg-spotify-gray-lightest transition'
    >
      <div
        style={{ position: 'relative' }}
        className='aspect-square md:aspect-w-1 md:aspect-h-1/2 lg:aspect-w-1 lg:aspect-h-3/4 xl:aspect-w-1 xl:aspect-h-4/5 p-4'
      >
        <img src={image} alt='' style={{ borderRadius: 5, width: '100%' }} />
        <div
          className={`circle-play-div transition translate-y-1/4 ${
            isCurrent && !state?.paused ? 'active' : ''
          }`}
        >
          <PlayCircle isCurrent={isCurrent} context={{ context_uri: uri }} />
        </div>
      </div>
      <div className='playlist-card-info'>
        <h3 className='text-md font-semibold text-white'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const AlbumCard = ({
  item,
  getDescription,
}: {
  item: Album;
  getDescription?: (playlist: Album) => string;
}) => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.spotify.state);

  const title = item.name;

  const description = getDescription
    ? getDescription(item)
    : item.artists.map((artist) => artist.name).join(', ');

  const isCurrentAlbum = state?.track_window?.current_track.album.uri === item.uri;

  return (
    <AlbumActionsWrapper album={item} trigger={['contextMenu']}>
      <div>
        <Card
          title={title}
          uri={item.uri}
          description={description}
          isCurrent={isCurrentAlbum}
          image={item.images[0].url}
          onClick={() => navigate(`/album/${item.id}`)}
        />
      </div>
    </AlbumActionsWrapper>
  );
};

export const PlaylistCard = ({
  item,
  getDescription,
}: {
  item: Playlist;
  getDescription?: (playlist: Playlist) => string;
}) => {
  const navigate = useNavigate();
  const [t] = useTranslation(['playlist']);
  const state = useAppSelector((state) => state.spotify.state);

  const title = item.name;
  const description = getDescription ? getDescription(item) : item.tracks?.total + ' ' + t('songs');
  const isCurrentAlbum = state?.track_window?.current_track.album.uri === item.uri;

  return (
    <PlayistActionsWrapper playlist={item} trigger={['contextMenu']}>
      <div>
        <Card
          title={title}
          uri={item.uri}
          description={description}
          isCurrent={isCurrentAlbum}
          image={item.images[0].url}
          onClick={() => navigate(`/playlist/${item.id}`)}
        />
      </div>
    </PlayistActionsWrapper>
  );
};
