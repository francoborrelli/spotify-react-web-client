/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCallback, useMemo } from 'react';
import { Pause, Play } from '../../../components/Icons';

// Interfaces

// Redux
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { libraryActions } from '../../../store/slices/library';

// Utils
import { PlaylistItem } from '../../../interfaces/playlists';
import { msToTime } from '../../../utils';
import { playerService } from '../../../services/player';
import ReactTimeAgo from 'react-time-ago';
import { Dropdown } from 'antd';

interface SongViewProps {
  index: number;
  song: PlaylistItem;
}
interface SongDataProps extends SongViewProps {}

const SongData = ({ song, index }: SongDataProps) => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => state.playlist.view);
  const isList = useMemo(() => view === 'LIST', [view]);

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
    <div className='flex flex-col' style={{ flex: 8 }}>
      <div className='flex flex-row items-center'>
        <p className='title text-left'>{song.track.name}</p>
      </div>

      {isList ? (
        <p className='text-left artist mobile-hidden'>
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
    <p className='text-left tablet-hidden' style={{ flex: 4 }}>
      <ReactTimeAgo date={new Date(song.added_at)} />
    </p>
  );

  const time = (
    <p className='text-right ' style={{ flex: 3 }}>
      {msToTime(song.track.duration_ms)}
    </p>
  );

  const items = [
    {
      label: '1st menu item',
      key: '1',
      children: [
        { key: '1', label: 'Option 1' },
        { key: '2', label: 'Option 2' },
      ],
    },
    {
      label: '2nd menu item',
      key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
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
                index + 1
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
        </div>
      </div>
    </Dropdown>
  );
};

const SongView = ({ song, index }: SongViewProps) => {
  const toggleOpen = useCallback(() => {}, []);

  return (
    <button
      key={song.track.id}
      className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center p-2 rounded-lg`}
      onClick={toggleOpen}
    >
      <SongData song={song} index={index} />
    </button>
  );
};

export default SongView;
