import { memo } from 'react';
import { HeartLike } from './Heart';
import { useAppSelector } from '../../../../store/store';

const SongDetails = memo(() => {
  const state = useAppSelector((state) => state.spotify.state);

  const { track_window } = state || {};
  const { current_track } = track_window || {};

  if (!current_track) {
    return null;
  }

  return (
    <div className='flex flex-row items-center'>
      <img alt='Album Cover' className='album-cover' src={current_track.album.images[0].url} />
      <div id='song-and-artist-name'>
        <p className='text-white font-bold song-title' title={current_track.name}>
          {current_track.name}
        </p>
        <p
          className='text-gray-200 song-artist'
          title={current_track.artists.map((a) => a.name).join(', ')}
        >
          {current_track.artists.map((a) => a.name).join(', ')}
        </p>
      </div>

      <HeartLike />
    </div>
  );
});

export default SongDetails;
