import { FC } from 'react';
import { DeviceItem } from './device';
import { useTranslation } from 'react-i18next';

// Redux
import { useAppSelector } from '../../../../../../store/store';
import { getOtherDevices } from '../../../../../../store/slices/spotify';

export const DevicesList: FC = () => {
  const [t] = useTranslation(['playingBar']);
  const devices = useAppSelector(getOtherDevices);

  if (!devices || !devices.length) return null;

  return (
    <div>
      <h2 className='device-list-title'>{t('Select another device')}</h2>
      <ul className='device-list'>
        {devices.map((device) => (
          <li key={device.id}>
            <DeviceItem key={device.id} device={device} />
          </li>
        ))}
      </ul>
    </div>
  );
};
