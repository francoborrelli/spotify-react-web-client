import { memo } from 'react';

// Utils
import { useAppSelector } from '../../../../../store/store';
import { GridItemList } from '../../../../../components/Lists/list';

export const ArtistsSearchSection = memo(() => {
  const artists = useAppSelector((state) => state.search.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList items={artists} />
      </div>
    </div>
  );
});
