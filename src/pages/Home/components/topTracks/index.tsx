import { HorizontalCard } from './horizontalCard';

// Redux
import { useAppSelector } from '../../../../store/store';

// Utils
import useIsMobile from '../../../../utils/isMobile';

// Interfaces
import type { FC } from 'react';

export const TopTracks: FC<{ setColor: (str: string) => void }> = (props) => {
  const isMobile = useIsMobile();
  const topTracks = useAppSelector((state) => state.home.topTracks);

  if (!topTracks || !topTracks.length) return null;

  return (
    <div className='home-top-tracks'>
      {topTracks.slice(0, isMobile ? 4 : undefined).map((item) => (
        <HorizontalCard key={item.id || item.name} item={item} setColor={props.setColor} />
      ))}
    </div>
  );
};
