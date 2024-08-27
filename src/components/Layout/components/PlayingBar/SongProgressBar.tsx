/* eslint-disable react-hooks/exhaustive-deps */
// Components
import { Slider } from '../../../Slider';

// Utils
import { msToTime } from '../../../../utils';

// Redux
import { useAppSelector } from '../../../../store/store';
import { playerService } from '../../../../services/player';

const SongProgressBar = () => {
  const state = useAppSelector((state) => state.spotify.state);

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='text-white mr-2 text-xs'>
        {state && state.position ? msToTime(state.position) : '0:00'}
      </div>
      <div style={{ width: '100%' }}>
        <Slider
          value={
            state?.duration
              ? state.position >= state?.duration
                ? 0
                : state.position / state.duration
              : 0
          }
          isEnabled
          onChange={(value) => {
            if (!state) return;
            const newPosition = Math.round(state.duration * value);
            playerService.seekToPosition(newPosition).then();
          }}
        />
      </div>
      <div className='text-white ml-2 text-xs'>
        {state && state.duration ? msToTime(state.duration) : '0:00'}
      </div>
    </div>
  );
};

export default SongProgressBar;
