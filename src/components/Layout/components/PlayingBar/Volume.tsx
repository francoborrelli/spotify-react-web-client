// Components
import { Space } from 'antd';
import { Tooltip } from '../../../Tooltip';
import { Slider } from '../../../Slider';
import { VolumeIcon, VolumeMuteIcon, VolumeOneIcon, VolumeTwoIcon } from '../../../Icons';

// I18n
import { useTranslation } from 'react-i18next';
import { playerService } from '../../../../services/player';
import { useAppSelector } from '../../../../store/store';
import { useEffect, useState } from 'react';

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
  const player = useAppSelector((state) => state.spotify.player);

  const [volume, setVolume] = useState<number>(1);

  useEffect(() => {
    if (player) {
      player.getVolume().then((volume) => {
        setVolume(volume);
      });
    }
  }, [player]);

  const muted = volume === 0;

  return (
    <div className='volume-control-container'>
      <Space style={{ display: 'flex' }}>
        <Tooltip title={muted ? t('Unmute') : t('Mute')}>
          <div
            onClick={() => {
              playerService.setVolume(muted ? volume : 100).then();
              setVolume(muted ? volume : 1);
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
              setVolume(value);
            }}
            onChangeEnd={(value) => {
              setVolume(value);
              playerService.setVolume(Math.round(value * 100)).then();
            }}
          />
        </div>
      </Space>
    </div>
  );
};

export default VolumeControls;
