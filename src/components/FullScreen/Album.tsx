import { memo } from 'react';
import { useAppSelector } from '../../store/store';

const AlbumSongDetails = memo(() => {
  const state = useAppSelector((state) => state.spotify.state);
  const currentSong = state?.track_window.current_track;

  if (!state) return <></>;

  return (
    <div className='flex flex-row items-center'>
      <img alt='Album Cover' className='album-cover' src={`${currentSong?.album.images[0].url}`} />
      <div id='song-and-artist-name'>
        <p className='text-white font-bold song-title' title={currentSong?.name}>
          {currentSong?.name}
        </p>
        <p
          className='text-gray-200 song-artist'
          title={currentSong?.artists
            .slice(0, 3)
            .map((a) => a.name)
            .join(', ')}
        >
          {currentSong?.artists
            .slice(0, 3)
            .map((a) => a.name)
            .join(', ')}
        </p>
      </div>
    </div>
  );
});

AlbumSongDetails.displayName = 'FullScreenAlbumSongDetails';

export default AlbumSongDetails;
