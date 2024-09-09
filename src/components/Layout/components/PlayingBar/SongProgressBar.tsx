/* eslint-disable react-hooks/exhaustive-deps */
// Components
import { Slider } from '../../../Slider';

// Utils
import { msToTime } from '../../../../utils';

// Redux
import { useAppSelector } from '../../../../store/store';
import { playerService } from '../../../../services/player';
import { memo, useEffect, useState } from 'react';

const SongProgressBar = memo(() => {
  const loaded = useAppSelector((state) => !!state.spotify.state);
  const position = useAppSelector((state) => state.spotify.state?.position);
  const duration = useAppSelector((state) => state.spotify.state?.duration);

  const [value, setValue] = useState<number>(0);
  const [selecting, setSelecting] = useState<boolean>(false);

  useEffect(() => {
    if (position && duration && !selecting) {
      setValue(duration ? (position >= duration ? 0 : position / duration) : 0);
    }
  }, [position, duration, selecting]);

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='text-white mr-2 text-xs'>{position ? msToTime(position) : '0:00'}</div>
      <div style={{ width: '100%' }}>
        <Slider
          isEnabled
          value={value}
          onChangeStart={() => {
            setSelecting(true);
          }}
          onChange={(value) => {
            setValue(value);
          }}
          onChangeEnd={(value) => {
            setSelecting(false);
            if (!loaded) return;
            setValue(value);
            const newPosition = Math.round((duration || 0) * value);
            playerService.seekToPosition(newPosition).then();
          }}
        />
      </div>
      <div className='text-white ml-2 text-xs'>{duration ? msToTime(duration) : '0:00'}</div>
    </div>
  );
});

export default SongProgressBar;
