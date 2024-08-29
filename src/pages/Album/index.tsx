// Components
import { AlbumList } from './table';
import { AlbumHeader } from './header';

// Utils
import { useParams } from 'react-router-dom';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';

// Redux
import { albumActions } from '../../store/slices/album';
import { useAppDispatch, useAppSelector } from '../../store/store';

const AlbumView: FC<{ container: RefObject<HTMLDivElement> }> = (props) => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const { albumId } = useParams<{ albumId: string }>();
  const [color, setColor] = useState<string>('#121212');
  const album = useAppSelector((state) => state.album.album);

  useEffect(() => {
    if (album && album.images?.length) {
      getImageAnalysis2(album.images[0].url).then((color) => {
        setColor(color);
      });
    }
  }, [album]);

  useEffect(() => {
    if (albumId) dispatch(albumActions.fetchAlbum(albumId));
    return () => {
      dispatch(albumActions.setAlbum({ album: null }));
    };
  }, [dispatch, albumId]);

  if (!album) return null;
  return (
    <div className='Playlist-section' ref={containerRef}>
      <AlbumHeader color={color} container={props.container} sectionContainer={containerRef} />
      <AlbumList color={color} />
    </div>
  );
};

AlbumView.displayName = 'AlbumView';

export default AlbumView;
