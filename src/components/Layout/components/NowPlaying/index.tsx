import { Queue } from './Queue';
import { Devices } from './Devices';
import { Details } from './Details';

// Redux
import { memo, useEffect } from 'react';
import { fetchQueue } from '../../../../store/slices/queue';
import { fetchDevices } from '../../../../store/slices/spotify';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

export const PlayingNow = memo(() => {
  const dispatch = useAppDispatch();

  const currentSong = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track,
    (a, b) => a?.id === b?.id
  );

  const queue = useAppSelector((state) => !state.ui.queueCollapsed);
  const details = useAppSelector((state) => !state.ui.detailsCollapsed);
  const devices = useAppSelector((state) => !state.ui.devicesCollapsed);

  useEffect(() => {
    const interval = setTimeout(() => {
      dispatch(fetchQueue());
      dispatch(fetchDevices());
    }, 1000);

    return () => clearTimeout(interval);
  }, [currentSong?.id, dispatch]);

  if (devices) return <Devices />;
  if (queue) return <Queue />;
  if (details) return <Details />;

  return null;
});
