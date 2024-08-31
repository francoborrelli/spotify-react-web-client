import { memo } from 'react';

// Components
import { GridItemList } from '../../../../../components/Lists/list';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { searchHistoryActions } from '../../../../../store/slices/searchHistory';

export const AlbumsSearchSection = memo(() => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector((state) => state.search.albums);

  if (!albums || !albums.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={albums}
          onItemClick={(item) => dispatch(searchHistoryActions.setItem(item))}
        />
      </div>
    </div>
  );
});
