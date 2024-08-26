import { Queue } from './Queue';
import { Details } from './Details';

// Redux
import { memo, useEffect } from 'react';
import { fetchQueue } from '../../../../store/slices/queue';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchArtist } from '../../../../store/slices/playingNow';

export const PlayingNow = memo(() => {
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track);
  const artist = currentSong?.artists[0].uri.split(':')[2];

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchQueue());
      if (artist) dispatch(fetchArtist(artist));
    }, 1000);
  }, [currentSong?.id, artist, dispatch]);

  const queue = useAppSelector((state) => !state.ui.queueCollapsed);
  const details = useAppSelector((state) => !state.ui.detailsCollapsed);

  if (queue) return <Queue />;
  if (details) return <Details />;

  return null;
});
