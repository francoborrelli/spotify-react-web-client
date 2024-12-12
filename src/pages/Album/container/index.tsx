import { FC, RefObject, useEffect, useRef, useState } from 'react';

// Components
import { AlbumList } from './table';
import { AlbumHeader } from './header';

// Utils
import { getImageAnalysis2 } from '../../../utils/imageAnyliser';

// Redux
import { useAppSelector } from '../../../store/store';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';
import tinycolor from 'tinycolor2';

const AlbumPageContainer: FC<{ container: RefObject<HTMLDivElement | null> }> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const album = useAppSelector((state) => state.album.album);
  const [color, setColor] = useState<string>(DEFAULT_PAGE_COLOR);

  useEffect(() => {
    if (album && album.images?.length) {
      getImageAnalysis2(album.images[0].url).then((r) => {
        let color = tinycolor(r);
        while (color.isLight()) {
          color = color.darken(10);
        }
        setColor(color.toHexString());
      });
    }
  }, [album]);

  if (!album) return null;
  return (
    <div className='Playlist-section' ref={containerRef}>
      <AlbumHeader color={color} container={props.container} sectionContainer={containerRef} />
      <AlbumList color={color} />
    </div>
  );
};

AlbumPageContainer.displayName = 'AlbumPageContainer';

export default AlbumPageContainer;
