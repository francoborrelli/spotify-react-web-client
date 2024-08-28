import { FC, memo, RefObject, useEffect, useState } from 'react';

// Utils
import { useParams } from 'react-router-dom';

// Redux
import { fetchArtist } from '../../store/slices/artist';
import { useAppDispatch, useAppSelector } from '../../store/store';

import { ArtistHeader } from './container/header';
import ArtistContent from './container/content';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';
import tinycolor from 'tinycolor2';

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
        setColor(tinycolor(color).darken(20).toString());
      });
    }
  }, [artist]);

  if (!artist) return null;

  return (
    <div>
      <ArtistHeader container={props.container} color={color} />
      <div style={{ marginTop: -20 }}>
        <ArtistContent color={color} />
      </div>
    </div>
  );
});

export default ArtistPage;
