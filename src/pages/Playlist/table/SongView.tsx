/* eslint-disable jsx-a11y/anchor-is-valid */

import ReactTimeAgo from 'react-time-ago';
import { useCallback, useMemo } from 'react';
import { MenuIcon, Pause, Play } from '../../../components/Icons';
import { TrackActionsWrapper } from '../../../components/Actions/TrackActions';

// Redux
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { libraryActions } from '../../../store/slices/library';

// Service
import { playerService } from '../../../services/player';

// Utils
import { msToTime } from '../../../utils';

// Interfaces
import type { PlaylistItem } from '../../../interfaces/playlists';

interface SongViewProps {
  index: number;
  song: PlaylistItem;
}
interface SongDataProps extends SongViewProps {}

const SongData = ({ song, index }: SongDataProps) => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => state.playlist.view);
  const isList = useMemo(() => view === 'LIST', [view]);

  const language = useAppSelector((state) => state.language.language);
  const canEdit = useAppSelector((state) => state.playlist.canEdit);
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const isPlaying = useAppSelector((state) => state.spotify.state?.paused === false);
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track);
  const isCurrent = useMemo(() => currentSong?.uri === song.track.uri, [currentSong, song]);

  const onClick = useCallback(() => {
    if (isCurrent && isPlaying) {
      return playerService.pausePlayback();
    }
    if (isCurrent) {
      return playerService.startPlayback();
    }
    return playerService.startPlayback({
      context_uri: playlist?.uri,
      offset: { position: index },
    });
  }, [index, isCurrent, isPlaying, playlist?.uri]);

  const image = isList ? (
    <img
      alt='song cover'
      src={song.track.album.images[0].url}
      className='w-10 h-10 mr-4 rounded-md'
    />
  ) : null;

  const title = (
    <div className='flex flex-col' style={{ flex: 7 }}>
      <div className='flex flex-row items-center'>
        <p className='title text-left'>{song.track.name}</p>
      </div>

      {isList ? (
        <p className='text-left artist mobile-hidden'>
          {song.track.explicit ? <span className='explicit'>E</span> : null}
          {song.track.artists.map((a) => a.name).join(', ')}
        </p>
      ) : null}
    </div>
  );

  const album = (
    <p className='text-left tablet-hidden' style={{ flex: 5 }}>
      {song.track.album.name}
    </p>
  );

  const added = (
    <p className='text-left tablet-hidden' style={{ flex: 3 }}>
      <ReactTimeAgo
        date={new Date(song.added_at)}
        locale={language === 'es' ? 'es-AR' : undefined}
      />
    </p>
  );

  const time = (
    <p className='text-right ' style={{ flex: 3, display: 'flex', justifyContent: 'end' }}>
      {msToTime(song.track.duration_ms)}
    </p>
  );

  const actions = (
    <p
      className='text-right actions tablet-hidden'
      style={{ flex: 1, display: 'flex', justifyContent: 'end' }}
    >
      <TrackActionsWrapper
        canEdit={canEdit}
        track={song.track}
        playlist={playlist!}
        trigger={['click']}
      >
        <MenuIcon />
      </TrackActionsWrapper>
    </p>
  );

  return (
    <TrackActionsWrapper
      canEdit={canEdit}
      track={song.track}
      playlist={playlist!}
      trigger={['contextMenu']}
    >
      <div
        className='song-details flex flex-row items-center w-full songDetails'
        onClick={() => {
          dispatch(libraryActions.setSongPlaying(song));
        }}
      >
        <div className='flex flex-row items-center justify-between w-full'>
          <div style={{ flex: 1 }} className='mobile-hidden'>
            <p className='song-details-index'>
              {isCurrent && isPlaying ? (
                <img
                  alt={'equaliser'}
                  style={{ height: 10, margin: '0 auto' }}
                  src={`${process.env.PUBLIC_URL}/images/equaliser-animated.gif`}
                />
              ) : (
                <span style={{ margin: '0 auto' }}>{index + 1}</span>
              )}
            </p>
            <button onClick={onClick} className='song-details-play'>
              {isCurrent && isPlaying ? <Pause /> : <Play />}
            </button>
          </div>
          {image}
          {title}
          {album}
          {added}
          {time}
          {actions}
        </div>
      </div>
    </TrackActionsWrapper>
  );
};

const SongView = ({ song, index }: SongViewProps) => {
  const toggleOpen = useCallback(() => {}, []);

  return (
    <button
      key={song.track.id}
      onClick={toggleOpen}
      className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center p-2 rounded-lg`}
    >
      <SongData song={song} index={index} />
    </button>
  );
};

export default SongView;
