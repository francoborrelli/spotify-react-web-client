import { PlayCircle } from './PlayCircle';
import { TrackActionsWrapper } from '../Actions/TrackActions';
import { AlbumActionsWrapper } from '../Actions/AlbumActions';
import { ArtistActionsWrapper } from '../Actions/ArtistActions';
import { PlayistActionsWrapper } from '../Actions/PlaylistActions';

// Interfaces
import type { Track } from '../../interfaces/track';
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';

// Constants
import { PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';
import { uiActions } from '../../store/slices/ui';
import { useCallback } from 'react';

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
  const paused = useAppSelector((state) => state.spotify.state?.paused);
  const contextUri = useAppSelector((state) => state.spotify.state?.context.uri);
  const isCurrent = contextUri === uri;

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
            isCurrent && !paused ? 'active' : ''
          }`}
        >
          <PlayCircle image={image} isCurrent={isCurrent} context={context} />
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
  onClick,
  getDescription,
}: {
  item: Artist;
  onClick?: () => void;
  getDescription?: (item: Artist) => string;
}) => {
  const navigate = useNavigate();
  const [t] = useTranslation(['artist']);

  const title = item.name;
  const description = getDescription ? getDescription(item) : t('Artist');

  return (
    <ArtistActionsWrapper artist={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
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
  onClick,
  getDescription,
}: {
  item: Album;
  onClick?: () => void;
  getDescription?: (playlist: Album) => string;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const onNavigate = useCallback(() => {
    if (!user) {
      return dispatch(uiActions.openLoginModal(item.images[0].url));
    }
    navigate(`/album/${item.id}`);
  }, [user, navigate, item.id, item.images, dispatch]);

  const title = item.name;

  const description = getDescription
    ? getDescription(item)
    : item.artists
        .slice(0, 3)
        .map((artist) => artist.name)
        .join(', ');

  return (
    <AlbumActionsWrapper album={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
        <Card
          title={title}
          uri={item.uri}
          onClick={onNavigate}
          description={description}
          image={item.images[0]?.url}
          context={{ context_uri: item.uri }}
        />
      </div>
    </AlbumActionsWrapper>
  );
};

export const PlaylistCard = ({
  item,
  onClick,
  getDescription,
}: {
  item: Playlist;
  onClick?: () => void;
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
      <div onClick={onClick}>
        <Card
          title={title}
          uri={item.uri}
          description={description}
          context={{ context_uri: item.uri }}
          onClick={() => navigate(`/playlist/${item.id}`)}
          image={item.images && item.images.length ? item.images[0].url : PLAYLIST_DEFAULT_IMAGE}
        />
      </div>
    </PlayistActionsWrapper>
  );
};

export const TrackCard = ({
  item,
  getDescription,
  onClick,
}: {
  item: Track;
  onClick?: () => void;
  getDescription?: (track: Track) => string;
}) => {
  const navigate = useNavigate();
  const description = getDescription ? getDescription(item) : item.album.name;

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
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
