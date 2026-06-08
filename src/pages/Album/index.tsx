// Utils
import { useParams } from 'react-router-dom';
import { FC, RefObject, useEffect } from 'react';

// Redux
import { useAppDispatch } from '../../store/store';
import { albumActions } from '../../store/slices/album';
import { useGetAlbumPageQuery } from '../../store/endpoints/catalog';

// Constants
import AlbumPageContainer from './container';

const AlbumPage: FC<{ container: RefObject<HTMLDivElement | null> }> = (props) => {
  const dispatch = useAppDispatch();

  const { albumId } = useParams<{ albumId: string }>();

  // Cached/deduped via RTK Query; mirrored into the album slice for existing sub-components.
  const { data: albumData } = useGetAlbumPageQuery(albumId!, { skip: !albumId });

  useEffect(() => {
    if (albumData) {
      dispatch(albumActions.setAlbumData(albumData));
    } else {
      dispatch(albumActions.setAlbum({ album: null }));
    }
  }, [albumData, dispatch]);

  return <AlbumPageContainer container={props.container} />;
};

AlbumPage.displayName = 'AlbumPage';

export default AlbumPage;
