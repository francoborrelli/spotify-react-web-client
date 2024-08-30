/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCallback, useMemo } from 'react';

import { Flex, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { MenuIcon, Pause, Play } from '../../../components/Icons';
import { AddSongToLibraryButton } from '../../../components/AddSongToLibrary';
import { TrackActionsWrapper } from '../../../components/Actions/TrackActions';

// Utils
import { msToTime } from '../../../utils';
import { useTranslation } from 'react-i18next';

// Services
import { playerService } from '../../../services/player';

// Redux
import { searchActions } from '../../../store/slices/search';
import { libraryActions } from '../../../store/slices/library';
import { useAppDispatch, useAppSelector } from '../../../store/store';

// Interfaces
import type { TrackWithSave } from '../../../interfaces/track';

interface SongViewProps {
  song: TrackWithSave;
  index: number;
}

const SongData = ({ song, index }: SongViewProps) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['order']);

  const songs = useAppSelector((state) => state.search.songs);
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
      uris: songs.slice(index).map((s) => s.uri),
    });
  }, [isCurrent, isPlaying, songs, index]);

  const button = (
    <button className='image-button' onClick={onClick}>
      {isPlaying && isCurrent ? <Pause /> : <Play />}
    </button>
  );

  const image = (
    <div className={`image p-2 h-full items-center`}>
      <div style={{ position: 'relative' }}>
        <div>
          <img
            alt={song.album.name}
            className='rounded-md'
            src={song.album.images[0].url}
            style={{ width: 40, height: 40 }}
          />
        </div>
        {button}
      </div>
    </div>
  );

  const title = (
    <div className='flex flex-col' style={{ flex: 8 }}>
      <div className='flex flex-row items-center'>
        <Flex vertical={true}>
          <p className={`title text-left ${isCurrent ? 'active' : ''}`}>{song.name}</p>

          <p className='text-left artist mobile-hidden'>
            {song.explicit ? <span className='explicit'>E</span> : null}
            {song.artists.slice(0, 3).map((a, i) => (
              <span>
                <Link to={`/artist/${a.id}`}>{a.name}</Link>
                {i < song.artists.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </Flex>
      </div>
    </div>
  );

  const time = (
    <p className='text-right ' style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
      {msToTime(song.duration_ms)}
    </p>
  );

  const addToLiked = (
    <p
      className='text-right tablet-hidden'
      style={{ flex: 1, display: 'flex', justifyContent: 'end' }}
    >
      <AddSongToLibraryButton
        size={18}
        id={song.id}
        isSaved={song.saved}
        onToggle={() => {
          dispatch(searchActions.setSavedStateForTrack({ id: song.id, saved: !song.saved }));
        }}
      />
    </p>
  );

  const actions = (
    <p
      className='text-right actions tablet-hidden'
      style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
    >
      <TrackActionsWrapper track={song} trigger={['click']}>
        <Tooltip title={`${t('More options for')} ${song?.name}`}>
          <div>
            <MenuIcon />
          </div>
        </Tooltip>
      </TrackActionsWrapper>
    </p>
  );

  return (
    <div
      className='song-details flex flex-row items-center w-full'
      onClick={() => {
        dispatch(libraryActions.setSongPlaying(song));
      }}
    >
      <div className='flex flex-row items-center justify-between w-full'>
        <div style={{ position: 'relative' }} className={'mr-4'}>
          <div>{image}</div>
          {button}
        </div>
        {title}
        {addToLiked}
        {time}
        {actions}
      </div>
    </div>
  );
};

const SongView = ({ song, index }: SongViewProps) => {
  return (
    <TrackActionsWrapper track={song} trigger={['contextMenu']}>
      <button
        key={song.name}
        className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center rounded-lg`}
      >
        <SongData song={song} index={index} />
      </button>
    </TrackActionsWrapper>
  );
};

export default SongView;
