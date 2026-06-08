import { FC, memo, RefObject, useEffect, useRef, useState } from 'react';

// Utils
import tinycolor from 'tinycolor2';
import { useParams } from 'react-router-dom';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';

// Redux
import { artistActions } from '../../store/slices/artist';
import { useGetArtistPageQuery } from '../../store/endpoints/catalog';
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

  // Load via RTK Query (cached + deduped + revalidated). The result is mirrored into the artist
  // slice so the existing sub-components keep reading state.artist.* unchanged. Revisiting an
  // artist serves from cache with no network call.
  const { data: artistData } = useGetArtistPageQuery(params.artistId!, {
    skip: !params.artistId,
  });

  useEffect(() => {
    if (artistData) {
      dispatch(artistActions.setArtistData(artistData));
    } else {
      // New/uncached artist still loading — clear the mirror so we don't show the previous one.
      dispatch(artistActions.setArtist({ artist: null }));
    }
  }, [artistData, dispatch]);

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
