import { useTranslation } from 'react-i18next';
import { NowPlayingLayout } from '../layout';

export const Devices = () => {
  const [t] = useTranslation(['playingBar']);

  return (
    <NowPlayingLayout title={t('Connect to a device')}>
      <div style={{ marginTop: 20 }}></div>
    </NowPlayingLayout>
  );
};
