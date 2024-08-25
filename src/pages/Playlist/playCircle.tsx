import { PlayCircle } from '../Home/components/PlayCircle';

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';

// Interfaces
import type { FC } from 'react';

export const PlayCircleButton: FC<{ size?: number }> = ({ size = 30 }) => {
  return <PlayCircle size={size} big={size >= 30} />;
};
