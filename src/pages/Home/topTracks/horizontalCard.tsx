import { PlayCircle } from '../components/PlayCircle';

// Interfaces
import { memo, useEffect, type FC } from 'react';
import type { Track } from '../../../interfaces/track';
import { getImageAnalysis } from '../../../utils/imageAnyliser';
import { useAppSelector } from '../../../store/store';

interface HorizontalCardProps {
  item: Track;
  setColor: (str: string) => void;
}

export const HorizontalCard: FC<HorizontalCardProps> = memo(({ item, setColor }) => {
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track);
  const isCurrent = currentSong?.id === item.id;

  useEffect(() => {
    if (item) getImageAnalysis(item.album.images[0].url).then();
  }, [item]);

  return (
    <div
      className='horizontal-playlist'
      onMouseEnter={() => {
        getImageAnalysis(item.album.images[0].url).then((r) => setColor(r));
      }}
    >
      <div style={{ display: 'flex' }}>
        <div className='img-container'>
          <div className='img-section'>
            <img src={item.album.images[0].url} alt={item.name} />
          </div>
        </div>
      </div>

      <div className='text-container'>
        <div className='text-section'>
          <div>
            <a draggable='false' title={item.name} href='/'>
              <p>{item.name}</p>
            </a>
          </div>
        </div>

        <div className='button-container'>
          {isCurrent ? (
            <img
              height={20}
              src={`${process.env.PUBLIC_URL}/images/equaliser-animated.gif`}
              alt={item.name}
            />
          ) : null}
          <PlayCircle size={15} isCurrent={isCurrent} context={{ uris: [item.uri] }} />
        </div>
      </div>
    </div>
  );
});
