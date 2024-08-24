import { Queue } from './Queue';
import { Details } from './Details';

// Redux
import { useAppSelector } from '../../../../store/store';

export const PlayingNow = () => {
  const queue = useAppSelector((state) => state.library.queue);
  if (queue) return <Queue />;
  return <Details />;
};
