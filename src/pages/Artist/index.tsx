import { FC, memo, RefObject, useEffect, useRef, useState } from 'react';

// Utils
import tinycolor from 'tinycolor2';
import { useParams } from 'react-router-dom';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';

// Redux
import { artistActions, fetchArtist } from '../../store/slices/artist';
import { useAppDispatch, useAppSelector } from '../../store/store';

import ArtistContent from './container/content';
import { ArtistHeader } from './container/header';
import ArtistHoverableMenu from './container/scrollHoverable';

interface ArtistPageProps {
  container: RefObject<HTMLDivElement | null>;
}

export const ArtistPage: FC<ArtistPageProps> = memo((props) => {
  const dispatch = useAppDispatch();

  const [color, setColor] = useState<string>('#535353');

  const ref = useRef<HTMLDivElement>(null);
  const params = useParams<{ artistId: string }>();
  const artist = useAppSelector((state) => state.artist.artist);

  useEffect(() => {
    if (params.artistId) {
      dispatch(fetchArtist(params.artistId));
      dispatch(artistActions.fetchOtherArtists(params.artistId));
    }
    return () => {
      dispatch(artistActions.setArtist({ artist: null }));
    };
  }, [dispatch, params.artistId]);

  useEffect(() => {
    if (artist && artist.images?.length) {
      getImageAnalysis2(artist.images[0].url).then((color) => {
        setColor(tinycolor(color).darken(20).toString());
      });
    }
  }, [artist]);

  if (!artist) return null;

  return (
    <div className='artist-page' ref={ref}>
      <ArtistHoverableMenu color={color} container={props.container} sectionContainer={ref} />

      <ArtistHeader container={props.container} color={color} />
      <div style={{ marginTop: -20 }}>
        <ArtistContent color={color} />
      </div>
    </div>
  );
});

export default ArtistPage;
