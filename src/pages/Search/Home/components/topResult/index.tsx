// Components
import { PlayCircle } from '../../../../../components/Lists/PlayCircle';
import { AlbumActionsWrapper } from '../../../../../components/Actions/AlbumActions';
import { TrackActionsWrapper } from '../../../../../components/Actions/TrackActions';
import { ArtistActionsWrapper } from '../../../../../components/Actions/ArtistActions';
import { PlayistActionsWrapper } from '../../../../../components/Actions/PlaylistActions';

// Utils
import { useTranslation } from 'react-i18next';
import { getPlaylistDescription } from '../../../../../utils/getDescription';

// Services
import { playerService } from '../../../../../services/player';

// Redux
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { searchHistoryActions } from '../../../../../store/slices/searchHistory';

// Interfaces
import { memo, type ReactNode } from 'react';
import type { Track } from '../../../../../interfaces/track';
import type { Album } from '../../../../../interfaces/albums';
import type { Artist } from '../../../../../interfaces/artist';
import type { Playlist } from '../../../../../interfaces/playlists';

// Constants
import { PLAYLIST_DEFAULT_IMAGE } from '../../../../../constants/spotify';

const Card = memo(
  ({
    link,
    image,
    title,
    description,
    context,
    rounded,
    onClick,
    uri,
  }: {
    link: string;
    image: string;
    title: string;
    uri?: string;
    rounded?: boolean;
    onClick?: () => void;
    context: {
      context_uri?: string;
      uris?: string[];
    };
    description: string | ReactNode;
  }) => {
    const navigate = useNavigate();

    const paused = useAppSelector((state) => state.spotify.state?.paused);
    const contextUri = useAppSelector((state) => state.spotify.state?.context?.uri);
    const isCurrent = contextUri === uri;

    return (
      <div
        style={{ cursor: 'pointer' }}
        onDoubleClick={() => {
          playerService.startPlayback(context);
        }}
        onClick={() => {
          if (onClick) onClick();
          navigate(link);
        }}
        className='playlist-card relative rounded-lg overflow-hidden  hover:bg-spotify-gray-lightest transition'
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
        <div
          className={`circle-play-div transition translate-y-1/4 ${
            isCurrent && !paused ? 'active' : ''
          }`}
        >
          <PlayCircle image={image} isCurrent={isCurrent} context={context} />
        </div>
      </div>
    );
  }
);

const TrackCard = memo(({ item }: { item: Track }) => {
  const { t } = useTranslation(['search']);
  const user = useAppSelector((state) => !!state.auth.user);

  return (
    <TrackActionsWrapper trigger={['contextMenu']} track={item}>
      <div>
        <Card
          uri={item.uri}
          title={item.name}
          context={{ uris: [item.uri] }}
          image={item.album.images[0].url}
          link={user ? `/album/${item.album.id}` : '/'}
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
});

const PlaylistCard = ({ item }: { item: Playlist }) => {
  const dispatch = useAppDispatch();
  return (
    <PlayistActionsWrapper playlist={item} trigger={['contextMenu']}>
      <div>
        <Card
          uri={item.uri}
          title={item.name}
          link={`/playlist/${item.id}`}
          context={{ context_uri: item.uri }}
          description={getPlaylistDescription(item)}
          onClick={() => dispatch(searchHistoryActions.setItem(item))}
          image={item.images && item.images.length ? item.images[0].url : PLAYLIST_DEFAULT_IMAGE}
        />
      </div>
    </PlayistActionsWrapper>
  );
};

const ArtistCard = ({ item }: { item: Artist }) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['artist']);

  return (
    <ArtistActionsWrapper artist={item} trigger={['contextMenu']}>
      <div>
        <Card
          rounded
          uri={item.uri}
          title={item.name}
          description={t('Artist')}
          image={item.images[0]?.url}
          link={`/artist/${item.id}`}
          context={{ context_uri: item.uri }}
          onClick={() => dispatch(searchHistoryActions.setItem(item))}
        />
      </div>
    </ArtistActionsWrapper>
  );
};

const AlbumCard = ({ item }: { item: Album }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['search']);
  const user = useAppSelector((state) => !!state.auth.user);

  return (
    <AlbumActionsWrapper album={item} trigger={['contextMenu']}>
      <div>
        <Card
          uri={item.uri}
          title={item.name}
          link={user ? `/album/${item.id}` : '/'}
          image={item.images[0]?.url}
          context={{ context_uri: item.uri }}
          onClick={() => dispatch(searchHistoryActions.setItem(item))}
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
    </AlbumActionsWrapper>
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
