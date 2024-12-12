import { FC, memo, RefObject, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import ArtistDiscographyContainer from './container';
import { artistDiscographyActions } from '../../store/slices/discography';

interface ArtistDicographyPageProps {
  container: RefObject<HTMLDivElement | null>;
}

export const ArtistDiscography: FC<ArtistDicographyPageProps> = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ artistId: string }>();

  useEffect(() => {
    if (params.artistId) {
      dispatch(artistDiscographyActions.fetchData(params.artistId));
    }
    return () => {
      dispatch(artistDiscographyActions.setArtist({ artist: null }));
    };
  }, [dispatch, params.artistId]);

  return (
    <div>
      <ArtistDiscographyContainer container={props.container} />
    </div>
  );
});

export default ArtistDiscography;
