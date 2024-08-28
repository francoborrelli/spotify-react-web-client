import { FC, memo, useMemo } from 'react';
import { ItemsList } from '../../Home/components/list';
import { useAppSelector } from '../../../store/store';

export const OtherAlbums: FC = memo(() => {
  const artist = useAppSelector((state) => state.album.artist);
  const current = useAppSelector((state) => state.album.album);
  const otherAlbums = useAppSelector((state) => state.album.otherAlbums);

  const items = useMemo(() => {
    if (current) {
      return otherAlbums.filter((album) => album.id !== current.id);
    }
    return otherAlbums;
  }, [current, otherAlbums]);

  return <ItemsList title={`More by ${artist?.name}`} items={items} />;
});
