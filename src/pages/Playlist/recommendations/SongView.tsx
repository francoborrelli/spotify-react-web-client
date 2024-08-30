/* eslint-disable jsx-a11y/anchor-is-valid */

import { useCallback, useMemo } from 'react';

// Components
import { Link } from 'react-router-dom';
import { AddRecommendation } from './add';
import { Pause, Play } from '../../../components/Icons';
import { TrackActionsWrapper } from '../../../components/Actions/TrackActions';
import { ArtistActionsWrapper } from '../../../components/Actions/ArtistActions';

// Redux
import { libraryActions } from '../../../store/slices/library';
import { useAppDispatch, useAppSelector } from '../../../store/store';

// Service
import { playerService } from '../../../services/player';

// Interfaces
import type { Track } from '../../../interfaces/track';

interface SongViewProps {
  song: Track;
}
interface SongDataProps extends SongViewProps {}

const SongData = ({ song }: SongDataProps) => {
  const dispatch = useAppDispatch();

  const canEdit = useAppSelector((state) => state.playlist.canEdit);
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const isPlaying = useAppSelector((state) => state.spotify.state?.paused === false);
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track);
  const isCurrent = useMemo(() => currentSong?.uri === song.uri, [currentSong, song]);
  const recommendations = useAppSelector((state) => state.playlist.recommedations);

  const onClick = useCallback(() => {
    if (isCurrent && isPlaying) {
      return playerService.pausePlayback();
    }
    if (isCurrent) {
      return playerService.startPlayback();
    }
    // recommendations startign  by song.uri
    const index = recommendations.findIndex((r) => r.uri === song.uri);
    const uris = recommendations.slice(index).map((r) => r.uri);
    return playerService.startPlayback({ uris });
  }, [isCurrent, isPlaying, recommendations, song.uri]);

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
            src={song.album.images[0].url}
            alt='song cover'
            className='rounded-md'
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
        <p className={`title text-left ${isCurrent ? 'active' : ''}`}>{song.name}</p>
      </div>

      <p className='text-left artist mobile-hidden'>
        {song.explicit ? (
          <span style={{ marginRight: 5 }} className='explicit'>
            E
          </span>
        ) : null}
        {song.artists.slice(0, 3).map((a, i) => (
          <span className='artists-block'>
            <ArtistActionsWrapper artist={a} trigger={['contextMenu']}>
              <Link key={a.id} to={`/artist/${a.id}`}>
                {a.name}
              </Link>
            </ArtistActionsWrapper>
            {i < song.artists.slice(0, 3).length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
    </div>
  );

  const album = (
    <p className='text-left tablet-hidden' style={{ flex: 5 }}>
      <Link to={`/album/${song.album.id}`}>{song.album.name}</Link>
    </p>
  );

  const add = (
    <div className='text-right' style={{ flex: 3 }}>
      <AddRecommendation song={song} />
    </div>
  );

  return (
    <TrackActionsWrapper
      canEdit={canEdit}
      track={song}
      playlist={playlist!}
      trigger={['contextMenu']}
    >
      <div
        className='song-details flex flex-row items-center w-full '
        onClick={() => {
          dispatch(libraryActions.setSongPlaying(song));
        }}
      >
        <div className='flex flex-row items-center justify-between w-full'>
          {image}
          {title}
          {album}
          {add}
        </div>
      </div>
    </TrackActionsWrapper>
  );
};

const SongView = ({ song }: SongViewProps) => {
  const toggleOpen = useCallback(() => {}, []);

  return (
    <button
      key={song.id}
      onClick={toggleOpen}
      style={{ padding: '0.25rem' }}
      className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center rounded-lg`}
    >
      <SongData song={song} />
    </button>
  );
};

export default SongView;
