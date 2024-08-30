import { PlayCircle } from './PlayCircle';
import { AlbumActionsWrapper } from '../Actions/AlbumActions';
import { PlayistActionsWrapper } from '../Actions/PlaylistActions';

// Interfaces
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { ArtistActionsWrapper } from '../Actions/ArtistActions';
import { TrackActionsWrapper } from '../Actions/TrackActions';
import { Track } from '../../interfaces/track';

const Card = ({
  uri,
  title,
  image,
  rounded,
  description,
  onClick,
  context,
}: {
  uri: string;
  image: string;
  title: string;
  rounded?: boolean;
  description: string;
  onClick: () => void;
  context: { context_uri?: string; uris?: string[] };
}) => {
  const state = useAppSelector((state) => state.spotify.state);

  const isCurrent = state?.context?.uri === uri;

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
        <img
          src={image}
          alt={title}
          className={rounded ? 'rounded' : ''}
          style={{ borderRadius: 5, width: '100%' }}
        />
        <div
          className={`circle-play-div transition translate-y-1/4 ${
            isCurrent && !state?.paused ? 'active' : ''
          }`}
        >
          <PlayCircle isCurrent={isCurrent} context={context} />
        </div>
      </div>
      <div className='playlist-card-info'>
        <h3 className='text-md font-semibold text-white'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const ArtistCard = ({
  item,
  getDescription,
}: {
  item: Artist;
  getDescription?: (item: Artist) => string;
}) => {
  const navigate = useNavigate();
  const [t] = useTranslation(['artist']);

  const title = item.name;
  const description = getDescription ? getDescription(item) : t('Artist');

  return (
    <ArtistActionsWrapper artist={item} trigger={['contextMenu']}>
      <div>
        <Card
          rounded
          title={title}
          uri={item.uri}
          description={description}
          image={item.images[0]?.url}
          context={{ context_uri: item.uri }}
          onClick={() => navigate(`/artist/${item.id}`)}
        />
      </div>
    </ArtistActionsWrapper>
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

  const title = item.name;

  const description = getDescription
    ? getDescription(item)
    : item.artists
        .slice(0, 3)
        .map((artist) => artist.name)
        .join(', ');

  return (
    <AlbumActionsWrapper album={item} trigger={['contextMenu']}>
      <div>
        <Card
          title={title}
          uri={item.uri}
          description={description}
          image={item.images[0]?.url}
          context={{ context_uri: item.uri }}
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

  const title = item.name;
  const description = getDescription
    ? getDescription(item)
    : item.tracks?.total + ' ' + t(item.tracks?.total === 1 ? 'song' : 'songs');

  return (
    <PlayistActionsWrapper playlist={item} trigger={['contextMenu']}>
      <div>
        <Card
          title={title}
          uri={item.uri}
          description={description}
          image={item.images[0]?.url}
          context={{ context_uri: item.uri }}
          onClick={() => navigate(`/playlist/${item.id}`)}
        />
      </div>
    </PlayistActionsWrapper>
  );
};

export const TrackCard = ({
  item,
  getDescription,
}: {
  item: Track;
  getDescription?: (track: Track) => string;
}) => {
  const navigate = useNavigate();
  const description = getDescription ? getDescription(item) : item.album.name;

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div>
        <Card
          uri={item.uri}
          title={item.name}
          description={description}
          context={{ uris: [item.uri] }}
          image={item.album.images[0]?.url}
          onClick={() => navigate(`/album/${item.album.id}`)}
        />
      </div>
    </TrackActionsWrapper>
  );
};
