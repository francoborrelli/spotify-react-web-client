import { PlayCircle } from '../Home/PlayCircle';

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';

// Interfaces
import type { FC } from 'react';
import { playingBarActions } from '../../store/slices/playingBar';

export const PlayCircleButton: FC<{ size?: number }> = ({ size = 30 }) => {
  const dispatch = useAppDispatch();

  const playing = useAppSelector((state) => state.playingBar.playing);

  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      playing={playing}
      onClick={() => {
        if (playing) {
          dispatch(playingBarActions.setPause());
        } else {
          dispatch(playingBarActions.setPlaying());
        }
      }}
    />
  );
};
