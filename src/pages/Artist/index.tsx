import { FC, memo, RefObject, useEffect, useState } from 'react';

// Utils
import tinycolor from 'tinycolor2';
import { useParams } from 'react-router-dom';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';

// Redux
import { fetchArtist } from '../../store/slices/artist';
import { useAppDispatch, useAppSelector } from '../../store/store';

import ArtistContent from './container/content';
import { ArtistHeader } from './container/header';
import ArtistHoverableMenu from './container/scrollHoverable';
import { ArtistControls } from './container/controls';

interface ArtistPageProps {
  container: RefObject<HTMLDivElement>;
}

export const ArtistPage: FC<ArtistPageProps> = memo((props) => {
  const dispatch = useAppDispatch();

  const [color, setColor] = useState<string>('#535353');

  const params = useParams<{ artistId: string }>();
  const artist = useAppSelector((state) => state.artist.artist);

  useEffect(() => {
    if (params.artistId) dispatch(fetchArtist(params.artistId));
  }, [dispatch, params.artistId]);

  useEffect(() => {
    if (artist && artist.images?.length) {
      getImageAnalysis2(artist.images[0].url).then((color) => {
        setColor(tinycolor(color).toString());
      });
    }
  }, [artist]);

  if (!artist) return null;

  return (
    <div className='artist-page'>
      <ArtistHoverableMenu color={color} container={props.container} />

      <ArtistHeader container={props.container} color={color} />
      <div style={{ marginTop: -20 }}>
        <ArtistContent color={color} />
      </div>
    </div>
  );
});

export default ArtistPage;
