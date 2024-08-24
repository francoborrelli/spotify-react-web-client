import { memo } from 'react';
import { HeartLike } from './Heart';
import { useAppSelector } from '../../../../store/store';
import { getCurrentSongData } from '../../../../store/slices/playingBar';

const SongDetails = memo(() => {
  const currentSongData = useAppSelector(getCurrentSongData);

  return (
    <div className='flex flex-row items-center'>
      <img
        alt='Album Cover'
        className='album-cover'
        src={`${process.env.PUBLIC_URL}/images/songs/${currentSongData.image}`}
      />
      <div id='song-and-artist-name'>
        <p className='text-white font-bold song-title' title={currentSongData.name}>
          {currentSongData.name}
        </p>
        <p className='text-gray-200 song-artist' title={currentSongData.artist}>
          {currentSongData.artist}
        </p>
      </div>

      <HeartLike />
    </div>
  );
});

export default SongDetails;
