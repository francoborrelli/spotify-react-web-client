import { NowPlayingCard } from './card';
import { useAppSelector } from '../../../../../store/store';

import { NowPlayingLayout } from '../layout';

// Interfaces
import type { FC } from 'react';
import { AddToLibrary } from '../../../../Icons';

const Container: FC<{ song: Spotify.Track }> = ({ song }) => {
  return (
    <NowPlayingCard
      title={song.name}
      image={song.album.images[0].url}
      subtitle={song.artists.map((a) => a.name).join(',')}
      extra={<button>{<AddToLibrary />}</button>}
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
