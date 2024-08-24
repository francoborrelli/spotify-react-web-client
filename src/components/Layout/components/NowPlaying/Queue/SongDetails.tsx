import { FC, memo } from 'react';
import { Pause, Play } from '../../../../Icons';
import { AVAILABLE_SONGS } from '../../../../../constants/songs';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getCurrentSongData, playingBarActions } from '../../../../../store/slices/playingBar';
import { useTranslation } from 'react-i18next';

interface QueueSongDetailsProps {
  song: (typeof AVAILABLE_SONGS)[number];
}

const QueueSongDetails: FC<QueueSongDetailsProps> = memo(({ song }) => {
  const [t] = useTranslation(['cv']);
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector(getCurrentSongData);

  const sameSong = currentSong.name === song.name;

  const onPlay = () => {
    dispatch(playingBarActions.setSong({ song: AVAILABLE_SONGS.indexOf(song) }));
  };

  return (
    <div className='queue-song'>
      <div className=' flex flex-row items-center'>
        <div className='queue-song-image-container'>
          <div className='queue-song-overlay' onClick={onPlay}>
            {sameSong ? <Pause /> : <Play />}
          </div>
          <img
            alt='Album Cover'
            className='album-cover'
            src={`${process.env.PUBLIC_URL}/images/songs/${song.image}`}
          />
        </div>

        <div id='song-and-artist-name'>
          <p className='text-white font-bold song-title' title={t(song.name)}>
            {t(song.name)}
          </p>
          <p className='text-gray-200 song-artist' title={t(song.artist)}>
            {t(song.artist)}
          </p>
        </div>
      </div>
    </div>
  );
});

export default QueueSongDetails;
