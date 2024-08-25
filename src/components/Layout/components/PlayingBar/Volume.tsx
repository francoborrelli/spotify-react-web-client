// Components
import { Space } from 'antd';
import { Tooltip } from '../../../Tooltip';
import { Slider } from '../../../Slider';
import { VolumeIcon, VolumeMuteIcon, VolumeOneIcon, VolumeTwoIcon } from '../../../Icons';

// I18n
import { useTranslation } from 'react-i18next';
import { playerService } from '../../../../services/player';

const getIcon = (volume: number) => {
  if (volume === 0) {
    return <VolumeMuteIcon />;
  }

  if (volume < 0.4) {
    return <VolumeOneIcon />;
  }

  if (volume < 0.7) {
    return <VolumeTwoIcon />;
  }

  return <VolumeIcon />;
};

export const VolumeControls = () => {
  const { t } = useTranslation(['playingBar']);

  const { volume_percent = 0 } = {};
  const volume = volume_percent / 100;
  const muted = volume_percent === 0;

  return (
    <div className='volume-control-container'>
      <Space style={{ display: 'flex' }}>
        <Tooltip title={muted ? t('Unmute') : t('Mute')}>
          <div
            onClick={() => {
              playerService.setVolume(muted ? volume : 50).then();
            }}
          >
            {getIcon(muted ? 0 : volume)}
          </div>
        </Tooltip>

        <div className='flex items-center justify-between w-full' style={{ width: 90 }}>
          <Slider
            isEnabled
            value={muted ? 0 : volume}
            onChange={(value) => {
              playerService.setVolume(Math.round(value * 100)).then();
            }}
          />
        </div>
      </Space>
    </div>
  );
};

export default VolumeControls;
