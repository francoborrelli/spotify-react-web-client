import { memo } from 'react';

// Utils
import { useAppSelector } from '../../../../../store/store';
import { GridItemList } from '../../../../../components/Lists/list';

export const AlbumsSearchSection = memo(() => {
  const albums = useAppSelector((state) => state.search.albums);

  if (!albums || !albums.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList multipleRows items={albums} />
      </div>
    </div>
  );
});
