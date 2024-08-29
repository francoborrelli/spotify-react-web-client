import { FC, memo, RefObject, useRef } from 'react';
import ArtistDicographyHoverableMenu from './scrollHoverable';
import DiscographyContent from './content';

interface ArtistDicographyPageProps {
  container: RefObject<HTMLDivElement>;
}

export const ArtistDiscographyContainer: FC<ArtistDicographyPageProps> = memo((props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className='artist-discrography-page' ref={ref}>
      <ArtistDicographyHoverableMenu
        color='#121212'
        sectionContainer={ref}
        container={props.container}
      />

      <DiscographyContent />
    </div>
  );
});

export default ArtistDiscographyContainer;
