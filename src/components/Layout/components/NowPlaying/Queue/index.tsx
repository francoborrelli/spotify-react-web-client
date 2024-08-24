import { useTranslation } from 'react-i18next';
import { NowPlayingLayout } from '../layout';
import { getCurrentSongData, getQueue } from '../../../../../store/slices/playingBar';
import { useAppSelector } from '../../../../../store/store';

import QueueSongDetailsProps from './SongDetails';

const NowPlaying = () => {
  const [t] = useTranslation(['playingBar']);
  const currentSong = useAppSelector(getCurrentSongData);

  return (
    <div>
      <p className='playing-section-title'>{t('Now playing')}</p>
      <div style={{ margin: 5 }}>
        <QueueSongDetailsProps song={currentSong} />
      </div>
    </div>
  );
};

const Queueing = () => {
  const [t] = useTranslation(['playingBar']);
  const currentSongs = useAppSelector(getQueue);

  return (
    <div style={{ marginTop: 30 }}>
      <p className='playing-section-title'>{t('Next')}</p>

      <div style={{ margin: 5 }}>
        {currentSongs.map((song, index) => (
          <QueueSongDetailsProps key={index} song={song} />
        ))}
      </div>
    </div>
  );
};

export const Queue = () => {
  const [t] = useTranslation(['playingBar']);
  return (
    <NowPlayingLayout title={t('Queue')}>
      <NowPlaying />
      <Queueing />
    </NowPlayingLayout>
  );
};
