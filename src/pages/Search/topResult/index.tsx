// Components
import { PlayCircle } from '../../Home/components/PlayCircle';
import { TrackActionsWrapper } from '../../../components/Actions/TrackActions';
import { ArtistActionsWrapper } from '../../../components/Actions/ArticleActions';
import { PlayistActionsWrapper } from '../../../components/Actions/PlaylistActions';

// Utils
import { useTranslation } from 'react-i18next';
import { getPlaylistDescription } from '../../../utils/getDescription';

// Interfaces
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';

// Interfaces
import type { ReactNode } from 'react';
import type { Track } from '../../../interfaces/track';
import type { Album } from '../../../interfaces/albums';
import type { Artist } from '../../../interfaces/artist';
import type { Playlist } from '../../../interfaces/playlists';

const Card = ({
  link,
  image,
  title,
  description,
  context,
  rounded,
}: {
  link: string;
  image: string;
  title: string;
  rounded?: boolean;
  context: {
    context_uri?: string;
    uris?: string[];
  };
  description: string | ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ cursor: 'pointer' }}
      className='playlist-card relative rounded-lg overflow-hidden  hover:bg-spotify-gray-lightest transition'
      onClick={() => {
        navigate(link);
      }}
    >
      <div
        style={{ position: 'relative' }}
        className='md:aspect-w-1 md:aspect-h-1/2 lg:aspect-w-1 lg:aspect-h-3/4 xl:aspect-w-1 xl:aspect-h-4/5 p-4'
      >
        <img alt={title} src={image} className={`${rounded ? 'rounded' : ''}`} />
      </div>
      <div className='playlist-card-info'>
        <h3 className='text-md font-semibold text-white'>{title}</h3>
        <p>{description}</p>
      </div>
      <div className='circle-play-div transition translate-y-1/4'>
        <PlayCircle context={context} />
      </div>
    </div>
  );
};

const TrackCard = ({ item }: { item: Track }) => {
  const { t } = useTranslation(['search']);

  return (
    <TrackActionsWrapper trigger={['contextMenu']} track={item}>
      <div>
        <Card
          title={item.name}
          context={{ uris: [item.uri] }}
          link={`/album/${item.album.id}`}
          image={item.album.images[0].url}
          description={
            <p
              key={item.id}
              style={{
                gap: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {item.explicit ? <span className='explicit'>E</span> : null}
              <span>{t('Song')}</span>
              <span> • </span>
              {item.artists.slice(0, 3).map((a, i) => (
                <span>
                  <span style={{ color: '#fff' }}>{a.name}</span>
                  {i < item.artists.slice(0, 3).length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          }
        />
      </div>
    </TrackActionsWrapper>
  );
};

const PlaylistCard = ({ item }: { item: Playlist }) => {
  return (
    <PlayistActionsWrapper playlist={item} trigger={['contextMenu']}>
      <Card
        title={item.name}
        image={item.images[0]?.url}
        link={`/playlist/${item.id}`}
        context={{ context_uri: item.uri }}
        description={getPlaylistDescription(item)}
      />
    </PlayistActionsWrapper>
  );
};

const ArtistCard = ({ item }: { item: Artist }) => {
  const [t] = useTranslation(['artist']);
  return (
    <ArtistActionsWrapper artist={item} trigger={['contextMenu']}>
      <div>
        <Card
          rounded
          title={item.name}
          description={t('Artist')}
          image={item.images[0]?.url}
          link={`/artist/${item.id}`}
          context={{ context_uri: item.uri }}
        />
      </div>
    </ArtistActionsWrapper>
  );
};

const AlbumCard = ({ item }: { item: Album }) => {
  const { t } = useTranslation(['search']);

  return (
    <div>
      <Card
        title={item.name}
        link={`/album/${item.id}`}
        image={item.images[0]?.url}
        context={{ context_uri: item.uri }}
        description={
          <p
            key={item.id}
            style={{
              gap: 4,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span>{t('Album')}</span>
            <span> • </span>
            {item.artists.slice(0, 3).map((a, i) => (
              <span>
                <span style={{ color: '#fff' }}>{a.name}</span>
                {i < item.artists.slice(0, 3).length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        }
      />
    </div>
  );
};

export const TopResultSong = () => {
  const top = useAppSelector((state) => state.search.top);

  if (!top) return null;

  if (top.type === 'track') {
    return <TrackCard item={top} />;
  }
  if (top.type === 'playlist') {
    return <PlaylistCard item={top} />;
  }
  if (top.type === 'artist') {
    return <ArtistCard item={top} />;
  }
  if (top.type === 'album') {
    return <AlbumCard item={top} />;
  }

  return null;
};

export const TopResult = () => {
  const { t } = useTranslation(['search']);
  return (
    <div className='top-result-container'>
      <h1 className='section-title'>{t('Top Result')}</h1>
      <TopResultSong />
    </div>
  );
};

export default TopResult;