import { NowPlayingCard } from './card';
import { NowPlayingLayout } from '../layout';
import { AddSongToLibraryButton } from '../../../../AddSongToLibrary';

// Redux
import { spotifyActions } from '../../../../../store/slices/spotify';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

// Interfaces
import type { FC } from 'react';

const Container: FC<{ song: Spotify.Track }> = ({ song }) => {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => state.spotify.liked);

  const handleToggle = () => {
    dispatch(spotifyActions.setLiked({ liked: !isLiked }));
  };

  return (
    <NowPlayingCard
      title={song.name}
      image={song.album.images[0].url}
      subtitle={song.artists.map((a) => a.name).join(',')}
      extra={<AddSongToLibraryButton id={song.id!} isSaved={isLiked} onToggle={handleToggle} />}
    ></NowPlayingCard>
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
        </div>
      </NowPlayingLayout>
    </div>
  );
};
