import { FC, memo, useCallback } from 'react';
import { DeviceIcons } from '../../../../../../utils/spotify/getDeviceIcon';

// Services
import { playerService } from '../../../../../../services/player';

// Utils
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

// Redux
import { uiActions } from '../../../../../../store/slices/ui';
import { useAppDispatch } from '../../../../../../store/store';
import { spotifyActions } from '../../../../../../store/slices/spotify';

// Interfaces
import type { Device } from '../../../../../../interfaces/devices';

export const DeviceItem: FC<{ device: Device }> = memo(({ device }) => {
  const [t] = useTranslation(['playingBar']);
  const dispatch = useAppDispatch();

  const onClick = useCallback(async () => {
    if (device.is_restricted) return;

    try {
      await playerService.transferPlayback(device.id);
      dispatch(uiActions.collapseDevices());
      dispatch(spotifyActions.setActiveDevice({ activeDevice: device.id, type: device.type }));
      dispatch(spotifyActions.fetchDevices());
    } catch (error) {
      message.error(t('Failed to transfer playback'));
    }
  }, [device.is_restricted, device.id, device.type, dispatch, t]);

  return (
    <div
      onClick={onClick}
      className={`device-item-container ${device.is_restricted ? 'disabled' : ''}`}
    >
      <div className='device-icon-container'>
        <div className='item'>{DeviceIcons[device.type]}</div>
      </div>

      <div className='device-text-container'>
        <div className='text'>
          <p>
            <span>{device.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
});
