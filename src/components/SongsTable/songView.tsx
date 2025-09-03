import { Tooltip } from 'antd';
import ReactTimeAgo from 'react-time-ago';
import { useCallback, useMemo } from 'react';
import { MenuIcon, Pause, Play } from '../Icons';
import { TrackActionsWrapper } from '../Actions/TrackActions';

// Utils
import { msToTime } from '../../utils';
import { useTranslation } from 'react-i18next';

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';

// Services
import { Link, useNavigate } from 'react-router-dom';
import { playerService } from '../../services/player';
import { ArtistActionsWrapper } from '../Actions/ArtistActions';
import { AddSongToLibraryButton } from '../Actions/AddSongToLibrary';

// Interfaces
import type { Track } from '../../interfaces/track';
import type { Playlist } from '../../interfaces/playlists';
import type { Album as AlbumType } from '../../interfaces/albums';
import { spotifyActions } from '../../store/slices/spotify';
import useIsMobile from '../../utils/isMobile';
import { EQUILISER_IMAGE } from '../../constants/spotify';
import { Artist } from '../../interfaces/artist';
import { uiActions } from '../../store/slices/ui';

interface DefaultProps {
  song: Track;
  index?: number;
  saved?: boolean;
  canEdit?: boolean;
  addedAt?: string;
  activable?: boolean;
  size?: 'small' | 'normal';
  album?: AlbumType | null;
  playlist?: Playlist | null;
  artist?: Artist | null;
  onToggleLike?: () => void;

  view: 'LIST' | 'COMPACT';
  context: {
    context_uri?: string;
    uris?: string[];
    offset?: {
      position: number;
    };
  };
}

interface ComponentProps extends DefaultProps {
  isList: boolean;
  isCurrent: boolean;
  isPlaying: boolean;
  onPlay?: () => void;
}

interface SongViewProps extends DefaultProps {
  fields: ((props: ComponentProps) => React.ReactElement | null)[];
}

const getArtists = (artists: Track['artists']) => {
  return artists.slice(0, 3).map((a, i) => (
    <span key={a.id}>
      <ArtistActionsWrapper artist={a} trigger={['contextMenu']}>
        <Link key={a.id} to={`/artist/${a.id}`} style={{ cursor: 'pointer' }}>
          {a.name}
        </Link>
      </ArtistActionsWrapper>
      {i < artists.slice(0, 3).length - 1 ? ', ' : ''}
    </span>
  ));
};

const ClickeableCover = (props: ComponentProps) => {
  const { song, onPlay, isCurrent, isPlaying } = props;

  const button = (
    <button className='image-button' onClick={onPlay}>
      {isPlaying && isCurrent ? <Pause /> : <Play />}
    </button>
  );

  const imageUrl = (song?.album?.images || [])[0]?.url;
  if (!imageUrl) return null;

  return (
    <div className={`image p-2 h-full items-center`}>
      <div style={{ position: 'relative' }}>
        <div>
          <img
            src={imageUrl}
            alt={song.album.name}
            className='rounded-md'
            style={{ width: 40, height: 40 }}
          />
        </div>
        {button}
      </div>
    </div>
  );
};

const Title = (props: ComponentProps) => {
  const { song, isList, isCurrent } = props;

  return (
    <>
      <div className='flex flex-col' style={{ flex: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='flex flex-row items-center'>
              <p className={`title text-left ${isCurrent ? 'active' : ''}`}>
                <span>{song.name}</span>{' '}
                {song.explicit && !isList ? <span className='explicit'>E</span> : null}
              </p>
            </div>

            {isList ? (
              <p className='text-left artist mobile-hidden'>
                {song.explicit ? <span className='explicit'>E</span> : null}
                {getArtists(song.artists)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const Cover = ({ song, isList }: ComponentProps) => {
  if (!isList) return null;

  const imageUrl = (song?.album?.images || [])[0]?.url;
  if (!imageUrl) return null;

  return (
    <img alt='song cover' src={song.album?.images[0].url} className='w-10 h-10 mr-4 rounded-md' />
  );
};

const TitleWithCover = (props: ComponentProps) => {
  const { song, isList, isCurrent } = props;
  return (
    <>
      <div className='flex flex-col' style={{ flex: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Cover {...props} />

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='flex flex-row items-center'>
              <p className={`title text-left ${isCurrent ? 'active' : ''}`}>
                <span>{song.name}</span>{' '}
                {song.explicit && !isList ? <span className='explicit'>E</span> : null}
              </p>
            </div>

            {isList ? (
              <p className='text-left artist mobile-hidden'>
                {song.explicit ? <span className='explicit'>E</span> : null}
                <div>{getArtists(song.artists)}</div>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const Artists = ({ song, isList }: ComponentProps) => {
  if (isList) return null;
  return (
    <p className='text-left tablet-hidden' style={{ flex: 5 }}>
      {getArtists(song.artists)}
    </p>
  );
};

const Album = ({ song }: ComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const onNavigate = useCallback(
    (e: any) => {
      if (e) e.stopPropagation();
      if (e) e.preventDefault();
      if (!user) {
        return dispatch(uiActions.openLoginModal(song.album.images[0].url));
      }
      navigate(`/album/${song.album.id}`);
    },
    [user, navigate, song.album.id, song.album.images, dispatch]
  );

  return (
    <p className='text-left tablet-hidden' style={{ flex: 5 }}>
      <Link to={`/album/${song.album.id}`} onClick={onNavigate}>
        {song.album.name}
      </Link>
    </p>
  );
};

const AddedAt = ({ addedAt }: ComponentProps) => {
  const language = useAppSelector((state) => state.language.language);
  if (!addedAt) return null;
  return (
    <p className='text-left tablet-hidden' style={{ flex: 3 }}>
      <ReactTimeAgo date={new Date(addedAt)} locale={language === 'es' ? 'es-AR' : undefined} />
    </p>
  );
};

const AddToLiked = ({
  song,
  saved,
  onLikeRefresh,
}: ComponentProps & {
  onLikeRefresh: (id: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track.id);

  return (
    <p
      className='text-right tablet-hidden'
      style={{ flex: 1, display: 'flex', justifyContent: 'end' }}
    >
      <AddSongToLibraryButton
        size={18}
        id={song.id}
        isSaved={!!saved}
        onToggle={() => {
          if (onLikeRefresh) onLikeRefresh(song.id);
          if (currentSong === song.id) dispatch(spotifyActions.setLiked({ liked: !saved }));
        }}
      />
    </p>
  );
};

const Actions = ({ song }: ComponentProps) => {
  const [t] = useTranslation(['order']);
  return (
    <p
      className='text-right actions tablet-hidden'
      style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
    >
      <TrackActionsWrapper track={song} trigger={['click']}>
        <div>
          <Tooltip title={`${t('More options for')} ${song.name}`}>
            <div>
              <MenuIcon />
            </div>
          </Tooltip>
        </div>
      </TrackActionsWrapper>
    </p>
  );
};

const Time = ({ song }: ComponentProps) => {
  return (
    <p className='text-right ' style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
      {msToTime(song.duration_ms)}
    </p>
  );
};

const Index = ({
  index,
  isCurrent,
  isPlaying,
  onClick,
}: {
  index: number;
  isCurrent: boolean;
  isPlaying: boolean;
  onClick: () => void;
}) => {
  return (
    <div style={{ flex: 1 }} className='mobile-hidden'>
      <p className='song-details-index'>
        {isCurrent && isPlaying ? (
          <img alt={'equaliser'} style={{ height: 10, margin: '0 auto' }} src={EQUILISER_IMAGE} />
        ) : (
          <span style={{ margin: '0 auto' }}>{index + 1}</span>
        )}
      </p>
      <button className='song-details-play' onClick={onClick}>
        {isCurrent && isPlaying ? <Pause /> : <Play />}
      </button>
    </div>
  );
};

export const SongView = (props: SongViewProps) => {
  const { size = 'normal' } = props;
  const { view, song, index, context, artist, playlist, canEdit, fields, album } = props;

  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  const isPlaying = useAppSelector((state) => !!state.spotify.state?.paused);
  const currentSong = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track,
    (a, b) => a?.id === b?.id
  );

  const isCurrent = useMemo(() => currentSong?.uri === song.uri, [currentSong, song]);

  const selectedView = isMobile ? 'LIST' : view;

  const isList = selectedView === 'LIST';

  const onClick = useCallback(() => {
    if (!user) {
      return dispatch(uiActions.openLoginModal(song.album.images[0].url));
    }
    if (isCurrent && isPlaying) {
      return playerService.pausePlayback();
    }
    if (isCurrent) {
      return playerService.startPlayback();
    }
    return playerService.startPlayback(context);
  }, [user, isCurrent, isPlaying, context, dispatch, song.album?.images]);

  return (
    <TrackActionsWrapper
      track={song}
      album={album}
      key={song.id}
      artist={artist}
      canEdit={canEdit}
      playlist={playlist}
      trigger={['contextMenu']}
      saved={props.onToggleLike ? props.saved : undefined}
      onSavedToggle={props.onToggleLike ? props.onToggleLike : undefined}
    >
      <button
        onClick={isMobile ? onClick : undefined}
        onDoubleClick={!isMobile ? onClick : undefined}
        className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center ${
          size === 'normal' ? 'p-2' : ''
        } rounded-lg ${props.activable ? 'activable-song' : ''}`}
      >
        <div className='song-details flex flex-row items-center w-full'>
          <div className='flex flex-row items-center justify-between w-full'>
            {index !== undefined ? (
              <Index index={index} isCurrent={isCurrent} isPlaying={isPlaying} onClick={onClick} />
            ) : null}
            {fields.map((Field, i) => (
              <Field
                key={i}
                isList={isList}
                onPlay={onClick}
                isCurrent={isCurrent}
                isPlaying={isPlaying}
                {...props}
              />
            ))}
          </div>
        </div>
      </button>
    </TrackActionsWrapper>
  );
};

export default SongView;

export const SongViewComponents = {
  Title,
  ClickeableCover,
  TitleWithCover,
  Artists,
  Cover,
  Album,
  AddedAt,
  AddToLiked,
  Actions,
  Time,
};
