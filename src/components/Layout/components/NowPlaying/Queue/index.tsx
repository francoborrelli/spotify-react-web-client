import { useTranslation } from 'react-i18next';
import { NowPlayingLayout } from '../layout';
// import { useAppSelector } from '../../../../../store/store';

// import QueueSongDetailsProps from './SongDetails';

const NowPlaying = () => {
  const [t] = useTranslation(['playingBar']);

  return (
    <div>
      <p className='playing-section-title'>{t('Now playing')}</p>
      <div style={{ margin: 5 }}>{/* <QueueSongDetailsProps song={undefined} /> */}</div>
    </div>
  );
};

const Queueing = () => {
  const [t] = useTranslation(['playingBar']);

  return (
    <div style={{ marginTop: 30 }}>
      <p className='playing-section-title'>{t('Next')}</p>

      <div style={{ margin: 5 }}></div>
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
