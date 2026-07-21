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
import { EQUILISER_IMAGE, PLAYLIST_DEFAULT_IMAGE } from '../../../../constants/spotify';

interface HorizontalCardProps {
  item: Track;
  setColor: (str: string) => void;
}

export const HorizontalCard: FC<HorizontalCardProps> = memo(({ item, setColor }) => {
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track.id);
  const isPlaying = useAppSelector((state) => !state.spotify.state?.paused);
  const isCurrent = currentSong === item.id;
  const imageUrl = item.album?.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE;

  const isMobile = useIsMobile();

  const onClick = useCallback(() => {
    if (isCurrent) return;
    playerService.startPlayback({ uris: [item.uri] });
  }, [isCurrent, item.uri]);

  useEffect(() => {
    if (imageUrl) getImageAnalysis2(imageUrl).then();
  }, [imageUrl]);

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div
        className='horizontal-playlist'
        onClick={isMobile ? onClick : undefined}
        onDoubleClick={isMobile ? undefined : onClick}
        onMouseEnter={
          !isMobile
            ? () => {
                getImageAnalysis2(imageUrl).then((r) => {
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
        <div className='img-container'>
          <div className='img-section'>
            <img src={imageUrl} alt={item.name} />
          </div>
        </div>

        <div className='text-container'>
          <div className='text-section'>
            {isMobile ? (
              <p>{item.name}</p>
            ) : (
              <Link title={item.name} to={`/album/${item.album.id}`}>
                <p>{item.name}</p>
              </Link>
            )}
          </div>

          <div className='button-container'>
            {isCurrent && isPlaying ? (
              <img height={14} alt={item.name} src={EQUILISER_IMAGE} />
            ) : null}
            <PlayCircle size={12} isCurrent={isCurrent} context={{ uris: [item.uri] }} />
          </div>
        </div>
      </div>
    </TrackActionsWrapper>
  );
});
