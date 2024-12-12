import { FC, memo, RefObject, useRef } from 'react';

import DiscographyContent from './content';
import ArtistDicographyHoverableMenu from './scrollHoverable';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';

interface ArtistDicographyPageProps {
  container: RefObject<HTMLDivElement | null>;
}

export const ArtistDiscographyContainer: FC<ArtistDicographyPageProps> = memo((props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className='artist-discrography-page' ref={ref}>
      <ArtistDicographyHoverableMenu
        sectionContainer={ref}
        container={props.container}
        color={DEFAULT_PAGE_COLOR}
      />

      <DiscographyContent />
    </div>
  );
});

export default ArtistDiscographyContainer;
