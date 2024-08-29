import { NowPlayingCard } from './data';
import { NowPlayingLayout } from '../layout';
import { AddSongToLibraryButton } from '../../../../AddSongToLibrary';

// Redux
import { spotifyActions } from '../../../../../store/slices/spotify';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

// Interfaces
import type { FC } from 'react';
import { NextInQueue } from './next';
import { Artist } from './artist';
import { TrackActionsWrapper } from '../../../../Actions/TrackActions';
import { Link, useNavigate } from 'react-router-dom';

const Container: FC<{ song: Spotify.Track }> = ({ song }) => {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => state.spotify.liked);

  const handleToggle = () => {
    dispatch(spotifyActions.setLiked({ liked: !isLiked }));
  };

  return (
    <TrackActionsWrapper
      // @ts-ignore
      track={song}
      trigger={['contextMenu']}
    >
      <div>
        <NowPlayingCard
          title={song.name}
          albumId={song.album.uri.split(':').reverse()[0]}
          image={song.album.images[0].url}
          subtitle={
            <span>
              {song.artists.map((a, i) => (
                <span key={a.uri}>
                  <Link to={`/artist/${a.uri.split(':').reverse()[0]}`}>{a.name}</Link>
                  {i < song.artists.length - 1 && ', '}
                </span>
              ))}
            </span>
          }
          extra={<AddSongToLibraryButton id={song.id!} isSaved={isLiked} onToggle={handleToggle} />}
        />
      </div>
    </TrackActionsWrapper>
  );
};

export const Details = () => {
  const song = useAppSelector((state) => state.spotify.state?.track_window.current_track);
  if (!song) return null;

  return (
    <div>
      <NowPlayingLayout title={song.name}>
        <div>
          <Container song={song} />
          <Artist />
          <NextInQueue />
        </div>
      </NowPlayingLayout>
    </div>
  );
};
