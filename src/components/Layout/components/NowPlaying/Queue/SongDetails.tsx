import { FC, memo, useMemo } from 'react';
import { Pause, Play } from '../../../../Icons';
import { useAppSelector } from '../../../../../store/store';
import { playerService } from '../../../../../services/player';
import { Episode } from '../../../../../interfaces/episode';
import useIsMobile from '../../../../../utils/isMobile';

interface QueueSongDetailsProps {
  song: Spotify.Track | Episode;
  isPlaying: boolean;
}

const QueueSongDetails: FC<QueueSongDetailsProps> = memo(({ song, isPlaying }) => {
  const isMobile = useIsMobile();
  const queue = useAppSelector((state) => state.queue.queue);
  const isPaused = useAppSelector((state) => state.spotify.state?.paused);

  const onClick = async () => {
    if (!isPaused && isPlaying) {
      return playerService.pausePlayback();
    }
    if (isPlaying) {
      return playerService.startPlayback();
    } else {
      const index = queue.findIndex((q) => q.id === song.id);
      return playerService.startPlayback({ uris: queue.slice(index).map((q_1) => q_1.uri) });
    }
  };

  const image = useMemo(() => {
    if (song.type === 'track') {
      return song.album.images[0].url;
    }

    if (song.type === 'episode') {
      return (song as any as Episode).images[0].url;
    }

    return '';
  }, [song]);

  const artists = useMemo(() => {
    if (song.type === 'track') {
      return song.artists
        .slice(0, 3)
        .map((a) => a.name)
        .join(', ');
    }

    if (song.type === 'episode') {
      return (song as any as Episode).show.publisher;
    }

    return '';
  }, [song]);

  return (
    <div
      className='queue-song'
      onClick={isMobile ? onClick : undefined}
      onDoubleClick={!isMobile ? onClick : undefined}
    >
      <div className=' flex flex-row items-center'>
        <div className='queue-song-image-container'>
          {!isMobile ? (
            <div className='queue-song-overlay' onClick={onClick}>
              {!isPaused && isPlaying ? <Pause /> : <Play />}
            </div>
          ) : null}

          <img alt='Album Cover' className='album-cover' src={image} />
        </div>
        <div id='song-and-artist-name'>
          <p
            title={song.name}
            className={`text-white font-bold song-title ${isPlaying ? 'active' : ''}`}
          >
            {song.name}
          </p>
          <p className='text-gray-200 song-artist' title={artists}>
            {artists}
          </p>
        </div>
      </div>
    </div>
  );
});

export default QueueSongDetails;
