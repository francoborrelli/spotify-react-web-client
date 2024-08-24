/* eslint-disable react-hooks/exhaustive-deps */
// Components
import { Slider } from '../../../Slider';

// Utils
import { useEffect } from 'react';
import { secondsToTime } from '../../../../utils';

// Redux
import { setCurrentTimeForPlayer } from '../../../../player';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { playingBarActions } from '../../../../store/slices/playingBar';

const SongProgressBar = () => {
  const dispatch = useAppDispatch();
  const playing = useAppSelector((state) => state.playingBar.playing);
  const duration = useAppSelector((state) => state.playingBar.duration);
  const currentTime = useAppSelector((state) => state.playingBar.currentTime);

  useEffect(() => {
    const id = setInterval(() => {
      if (playing) dispatch(playingBarActions.increaseTime());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [playing, duration]);

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='text-white mr-2 text-xs'>{secondsToTime(currentTime)}</div>
      <div style={{ width: '100%' }}>
        <Slider
          value={currentTime / duration}
          isEnabled
          onChange={(value) => {
            const seconds = Math.floor(value * duration);
            dispatch(playingBarActions.setTime({ time: seconds }));
            setCurrentTimeForPlayer(seconds);
          }}
        />
      </div>
      <div className='text-white ml-2 text-xs'>{secondsToTime(duration)}</div>
    </div>
  );
};

export default SongProgressBar;
