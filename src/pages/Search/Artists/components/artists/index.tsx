import { memo } from 'react';

// Components
import { GridItemList } from '../../../../../components/Lists/list';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { searchHistoryActions } from '../../../../../store/slices/searchHistory';

export const ArtistsSearchSection = memo(() => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector((state) => state.search.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={artists}
          onItemClick={(item) => {
            dispatch(searchHistoryActions.setItem(item));
          }}
        />
      </div>
    </div>
  );
});
