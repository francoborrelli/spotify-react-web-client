/* eslint-disable jsx-a11y/anchor-is-valid */

import ReactTimeAgo from 'react-time-ago';
import { useCallback, useMemo } from 'react';
import { Tooltip } from '../../../components/Tooltip';
import { MenuIcon, Pause, Play } from '../../../components/Icons';
import { AddSongToLibraryButton } from '../../../components/AddSongToLibrary';
import { TrackActionsWrapper } from '../../../components/Actions/TrackActions';

// Redux
import { libraryActions } from '../../../store/slices/library';
import { refreshTracks } from '../../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../../store/store';

// Service
import { playerService } from '../../../services/player';

// Utils
import { msToTime } from '../../../utils';
import { useTranslation } from 'react-i18next';

// Interfaces
import type { PlaylistItemWithSaved } from '../../../interfaces/playlists';

interface SongViewProps {
  index: number;
  song: PlaylistItemWithSaved;
}
interface SongDataProps extends SongViewProps {}

const SongData = ({ song, index }: SongDataProps) => {
  const dispatch = useAppDispatch();
  const [tor] = useTranslation(['order']);

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

  const artist = !isList ? (
    <p className='text-left tablet-hidden' style={{ flex: 5 }}>
      {song.track.artists.map((a) => a.name).join(', ')}
    </p>
  ) : null;

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

  const addToLiked = (
    <p
      className='text-right actions tablet-hidden'
      style={{ flex: 1, display: 'flex', justifyContent: 'end' }}
    >
      <AddSongToLibraryButton
        size={18}
        id={song.track.id}
        isSaved={song.saved}
        onToggle={() => {
          dispatch(refreshTracks(playlist!.id));
        }}
      />
    </p>
  );

  const time = (
    <p className='text-right ' style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
      {msToTime(song.track.duration_ms)}
    </p>
  );

  const actions = (
    <p
      className='text-right actions tablet-hidden'
      style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
    >
      <TrackActionsWrapper
        canEdit={canEdit}
        track={song.track}
        playlist={playlist!}
        trigger={['click']}
      >
        <Tooltip title={`${tor('More options for')} ${song.track?.name}`}>
          <div>
            <MenuIcon />
          </div>
        </Tooltip>
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
          {artist}
          {album}
          {added}
          {addToLiked}
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
