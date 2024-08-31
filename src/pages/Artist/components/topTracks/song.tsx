/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCallback, useMemo } from 'react';

// Components
import { Tooltip } from '../../../../components/Tooltip';
import { MenuIcon, Pause, Play } from '../../../../components/Icons';
import { AddSongToLibraryButton } from '../../../../components/Actions/AddSongToLibrary';
import { TrackActionsWrapper } from '../../../../components/Actions/TrackActions';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';

// Service
import { playerService } from '../../../../services/player';

// Utils
import { msToTime } from '../../../../utils';
import { useTranslation } from 'react-i18next';

// Interfaces
import type { TrackWithSave } from '../../../../interfaces/track';
import { artistActions } from '../../../../store/slices/artist';

interface SongViewProps {
  index: number;
  song: TrackWithSave;
}
interface SongDataProps extends SongViewProps {}

const SongData = ({ song, index }: SongDataProps) => {
  const dispatch = useAppDispatch();
  const [tor] = useTranslation(['order']);

  const topTracks = useAppSelector((state) => state.artist.topTracks);
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
      uris: topTracks.slice(index).map((track) => track.uri),
    });
  }, [index, isCurrent, isPlaying, topTracks]);

  const image = (
    <img alt='song cover' src={song.album.images[0].url} className='w-10 h-10 mr-4 rounded-md' />
  );

  const title = (
    <div className='flex flex-col' style={{ flex: 8 }}>
      <div className='flex flex-row items-center'>
        <p className={`title text-left ${isCurrent ? 'active' : ''}`}>{song.name}</p>
      </div>
    </div>
  );

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
          dispatch(artistActions.setTopSongLikeState({ id: song.id, saved: !song.saved }));
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
      <TrackActionsWrapper saved={song.saved} track={song} trigger={['click']}>
        <Tooltip title={`${tor('More options for')} ${song?.name}`}>
          <div>
            <MenuIcon />
          </div>
        </Tooltip>
      </TrackActionsWrapper>
    </p>
  );

  return (
    <TrackActionsWrapper saved={song.saved} track={song} trigger={['contextMenu']}>
      <div className='song-details flex flex-row items-center w-full ' onDoubleClick={onClick}>
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
          {addToLiked}
          {time}
          {actions}
        </div>
      </div>
    </TrackActionsWrapper>
  );
};

const TopSong = ({ song, index }: SongViewProps) => {
  return (
    <button
      key={song.id}
      className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center p-2 rounded-lg`}
    >
      <SongData song={song} index={index} />
    </button>
  );
};

export default TopSong;
