import { Link } from 'react-router-dom';
import { PlayCircle } from '../../../../components/Lists/PlayCircle';
import { TrackActionsWrapper } from '../../../../components/Actions/TrackActions';

// Redux
import { useAppSelector } from '../../../../store/store';

// Utils
import tinycolor from 'tinycolor2';
import useIsMobile from '../../../../utils/isMobile';
import { getImageAnalysis2 } from '../../../../utils/imageAnyliser';

// Interfaces
import { memo, useCallback, useEffect, type FC } from 'react';
import type { Track } from '../../../../interfaces/track';

// Services
import { playerService } from '../../../../services/player';

// Constants
import { EQUILISER_IMAGE } from '../../../../constants/spotify';

interface HorizontalCardProps {
  item: Track;
  setColor: (str: string) => void;
}

export const HorizontalCard: FC<HorizontalCardProps> = memo(({ item, setColor }) => {
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track.id);
  const isPlaying = useAppSelector((state) => !state.spotify.state?.paused);
  const isCurrent = currentSong === item.id;

  const isMobile = useIsMobile();

  const onClick = useCallback(() => {
    if (isCurrent) return;
    playerService.startPlayback({ uris: [item.uri] });
  }, [isCurrent, item.uri]);

  useEffect(() => {
    if (item) getImageAnalysis2(item.album.images[0].url).then();
  }, [item]);

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div
        className='horizontal-playlist'
        onClick={isMobile ? onClick : undefined}
        onDoubleClick={isMobile ? undefined : onClick}
        onMouseEnter={
          !isMobile
            ? () => {
                getImageAnalysis2(item.album.images[0].url).then((r) => {
                  let color = tinycolor(r);
                  while (color.isLight()) {
                    color = color.darken(10);
                  }
                  setColor(color.toHexString());
                });
              }
            : undefined
        }
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
              {isMobile ? (
                <p>{item.name}</p>
              ) : (
                <Link title={item.name} to={`/album/${item.album.id}`}>
                  <p>{item.name}</p>
                </Link>
              )}
            </div>
          </div>

          <div className='button-container'>
            {isCurrent && isPlaying ? (
              <img height={20} alt={item.name} src={EQUILISER_IMAGE} />
            ) : null}
            <PlayCircle size={15} isCurrent={isCurrent} context={{ uris: [item.uri] }} />
          </div>
        </div>
      </div>
    </TrackActionsWrapper>
  );
});
