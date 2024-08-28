/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCallback, useMemo } from 'react';

import { Tooltip } from '../../../components/Tooltip';
import { MenuIcon, Pause, Play } from '../../../components/Icons';
import { AddSongToLibraryButton } from '../../../components/AddSongToLibrary';
import { TrackActionsWrapper } from '../../../components/Actions/TrackActions';

// Redux
import { libraryActions } from '../../../store/slices/library';
import { useAppDispatch, useAppSelector } from '../../../store/store';

// Service
import { playerService } from '../../../services/player';

// Utils
import { msToTime } from '../../../utils';
import { useTranslation } from 'react-i18next';

// Interfaces
import type { TrackWithSave } from '../../../interfaces/track';

interface SongViewProps {
  index: number;
  song: TrackWithSave;
}
interface SongDataProps extends SongViewProps {}

const SongData = ({ song, index }: SongDataProps) => {
  const dispatch = useAppDispatch();
  const [tor] = useTranslation(['order']);

  const view = useAppSelector((state) => state.playlist.view);
  const isList = useMemo(() => view === 'LIST', [view]);

  const album = useAppSelector((state) => state.album.album);

  const isPlaying = useAppSelector((state) => state.spotify.state?.paused === false);
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track);
  const isCurrent = useMemo(() => currentSong?.uri === song.uri, [currentSong, song]);

  const onClick = useCallback(() => {
    if (isCurrent && isPlaying) {
      return playerService.pausePlayback();
    }
    if (isCurrent) {
      return playerService.startPlayback();
    }
    return playerService.startPlayback({
      context_uri: album?.uri,
      offset: { position: index },
    });
  }, [album?.uri, index, isCurrent, isPlaying]);

  const image = isList ? (
    <img alt='song cover' src={album!.images[0].url} className='w-10 h-10 mr-4 rounded-md' />
  ) : null;

  const title = (
    <div className='flex flex-col' style={{ flex: 8 }}>
      <div className='flex flex-row items-center'>
        <p className='title text-left'>{song.name}</p>
      </div>

      {isList ? (
        <p className='text-left artist mobile-hidden'>
          {song.explicit ? <span className='explicit'>E</span> : null}
          {song.artists.map((a) => a.name).join(', ')}
        </p>
      ) : null}
    </div>
  );

  const artist = !isList ? (
    <p className='text-right tablet-hidden' style={{ flex: 4 }}>
      {song.artists.map((a) => a.name).join(', ')}
    </p>
  ) : null;

  const addToLiked = (
    <p
      className='text-right actions tablet-hidden'
      style={{ flex: 1, display: 'flex', justifyContent: 'end' }}
    >
      <AddSongToLibraryButton
        size={18}
        id={song.id}
        isSaved={song.saved}
        onToggle={() => {
          // dispatch(refreshTracks(playlist!.id));
        }}
      />
    </p>
  );

  const time = (
    <p className='text-right ' style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
      {msToTime(song.duration_ms)}
    </p>
  );

  const actions = (
    <p
      className='text-right actions tablet-hidden'
      style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
    >
      <TrackActionsWrapper track={song} album={album!} trigger={['click']}>
        <Tooltip title={`${tor('More options for')} ${song?.name}`}>
          <div>
            <MenuIcon />
          </div>
        </Tooltip>
      </TrackActionsWrapper>
    </p>
  );

  return (
    <TrackActionsWrapper track={song} trigger={['contextMenu']}>
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
      key={song.id}
      onClick={toggleOpen}
      className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center p-2 rounded-lg`}
    >
      <SongData song={song} index={index} />
    </button>
  );
};

export default SongView;
