import { Tooltip } from '../../../../Tooltip';
import { SpeakerIcon } from '../../../../Icons';
import { AlbumActionsWrapper } from '../../../../Actions/AlbumActions';
import { ArtistActionsWrapper } from '../../../../Actions/ArtistActions';
import { PlayistActionsWrapper } from '../../../../Actions/PlaylistActions';

// Utils
import { useNavigate } from 'react-router-dom';

// Services
import { playerService } from '../../../../../services/player';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { yourLibraryActions } from '../../../../../store/slices/yourLibrary';

// Constants
import { ARTISTS_DEFAULT_IMAGE, PLAYLIST_DEFAULT_IMAGE } from '../../../../../constants/spotify';

// Interface
import type { Album } from '../../../../../interfaces/albums';
import type { Artist } from '../../../../../interfaces/artist';
import type { Playlist } from '../../../../../interfaces/playlists';
import { memo } from 'react';

export interface CardShortProps {
  uri: string;
  image: string;
  title: string;
  subtitle: string;
  rounded?: boolean;
  playing?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const Play = (
  <svg
    data-encore-id='icon'
    role='img'
    width={26}
    height={26}
    fill='white'
    aria-hidden='true'
    className='Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq'
    viewBox='0 0 24 24'
  >
    <path d='m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z'></path>
  </svg>
);

const Pause = (
  <svg
    data-encore-id='icon'
    role='img'
    width={26}
    height={26}
    fill='white'
    aria-hidden='true'
    className='Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq'
    viewBox='0 0 24 24'
  >
    <path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
  </svg>
);

export const CollapsedCard = (props: CardShortProps) => {
  const { image, title, subtitle, onClick } = props;

  return (
    <Tooltip
      placement='right'
      title={
        <div>
          <p>{title}</p>
          <p style={{ fontSize: 13, color: 'gray', fontWeight: 400 }}>{subtitle}</p>
        </div>
      }
    >
      <button
        onClick={onClick}
        onDoubleClick={props.onDoubleClick}
        style={{ borderRadius: 10, display: 'flex', justifyContent: 'center' }}
        className='library-card collapsed'
      >
        <div className={`image h-full items-center ${props.rounded ? 'rounded' : ''}`}>
          <img src={image} alt='' style={{ width: 52, height: 52 }} />
        </div>
      </button>
    </Tooltip>
  );
};

const CardList = (props: CardShortProps) => {
  const { image, title, subtitle, playing, onClick } = props;

  const button = (
    <button
      className='image-button'
      onClick={async (e) => {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        }
        if (playing) {
          return playerService.pausePlayback();
        }
        return playerService.startPlayback(!playing ? { context_uri: props.uri } : undefined);
      }}
    >
      {playing ? Pause : Play}
    </button>
  );

  return (
    <button
      onClick={onClick}
      className='library-card'
      style={{ borderRadius: 10 }}
      onDoubleClick={props.onDoubleClick}
    >
      <div className={`image p-2 h-full items-center ${props.rounded ? 'rounded' : ''}`}>
        <div style={{ position: 'relative' }}>
          <div>
            <img
              src={image}
              alt='song cover'
              className='rounded-md'
              style={{ width: 52, height: 52 }}
            />
          </div>
          {button}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div id='playlist-song-and-artist-name'>
          <h3
            className='text-md font-semibold text-white'
            style={{
              fontSize: 15,
              marginBottom: -5,
              color: playing ? '#1db954' : undefined,
              fontWeight: 100,
            }}
          >
            {title}
          </h3>

          <p
            className='text-md font-semibold text-white'
            style={{
              fontSize: 13,
              opacity: 0.7,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div style={{ padding: 8 }}>
          {playing ? <SpeakerIcon fill='#1db954' height={16} width={16} /> : null}
        </div>
      </div>
    </button>
  );
};

const Card = memo((props: CardShortProps) => {
  const collapsed = useAppSelector((state) => state.ui.libraryCollapsed);

  const onDoubleClick = () => {
    playerService.startPlayback({ context_uri: props.uri });
  };

  if (collapsed) {
    return <CollapsedCard {...props} onDoubleClick={onDoubleClick} />;
  }
  return <CardList {...props} onDoubleClick={onDoubleClick} />;
});

export const ArtistCardShort = ({ artist }: { artist: Artist }) => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.spotify.state);

  const onClick = () => {
    navigate(`/artist/${artist.id}`);
  };

  return (
    <ArtistActionsWrapper artist={artist} trigger={['contextMenu']}>
      <div>
        <Card
          rounded
          uri={artist.uri}
          subtitle='Artist'
          onClick={onClick}
          title={artist.name}
          playing={state?.context?.uri === artist.uri}
          image={artist?.images[0]?.url || ARTISTS_DEFAULT_IMAGE}
        />
      </div>
    </ArtistActionsWrapper>
  );
};

export const AlbumCardShort = ({ album }: { album: Album }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.spotify.state);

  const onClick = () => {
    navigate(`/album/${album.id}`);
  };

  return (
    <AlbumActionsWrapper
      album={album}
      trigger={['contextMenu']}
      onRefresh={() => {
        dispatch(yourLibraryActions.fetchMyAlbums());
      }}
    >
      <div>
        <Card
          uri={album.uri}
          onClick={onClick}
          title={album.name}
          image={album.images[0].url}
          subtitle={album.artists[0].name}
          playing={state?.context?.uri === album.uri}
        />
      </div>
    </AlbumActionsWrapper>
  );
};

const PlaylistCardShort = ({ playlist }: { playlist: Playlist }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.spotify.state);

  const onClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <PlayistActionsWrapper
      playlist={playlist}
      trigger={['contextMenu']}
      onRefresh={() => {
        dispatch(yourLibraryActions.fetchMyPlaylists());
      }}
    >
      <div>
        <Card
          onClick={onClick}
          uri={playlist.uri}
          title={playlist.name}
          playing={state?.context?.uri === playlist.uri}
          subtitle={`Playlist • ${playlist.owner?.display_name}`}
          image={playlist?.images?.length ? playlist?.images[0]?.url : PLAYLIST_DEFAULT_IMAGE}
        />
      </div>
    </PlayistActionsWrapper>
  );
};

export const ListItemComponent = ({ item }: { item: Artist | Playlist | Album }) => {
  if (item.type === 'artist') return <ArtistCardShort key={item.id} artist={item} />;
  if (item.type === 'album') return <AlbumCardShort key={item.id} album={item} />;
  return <PlaylistCardShort key={item.id} playlist={item} />;
};
