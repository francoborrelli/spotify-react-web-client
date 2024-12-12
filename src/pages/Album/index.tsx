// Utils
import { useParams } from 'react-router-dom';
import { FC, RefObject, useEffect } from 'react';

// Redux
import { useAppDispatch } from '../../store/store';
import { albumActions } from '../../store/slices/album';

// Constants
import AlbumPageContainer from './container';

const AlbumPage: FC<{ container: RefObject<HTMLDivElement | null> }> = (props) => {
  const dispatch = useAppDispatch();

  const { albumId } = useParams<{ albumId: string }>();

  useEffect(() => {
    if (albumId) dispatch(albumActions.fetchAlbum(albumId));
    return () => {
      dispatch(albumActions.setAlbum({ album: null }));
    };
  }, [dispatch, albumId]);

  return <AlbumPageContainer container={props.container} />;
};

AlbumPage.displayName = 'AlbumPage';

export default AlbumPage;
