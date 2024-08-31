import { memo } from 'react';

// Utils
import { useTranslation } from 'react-i18next';

// Components
import { GridItemList } from '../../../../../components/Lists/list';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { searchHistoryActions } from '../../../../../store/slices/searchHistory';

export const ArtistsSearchSection = memo(() => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['search']);
  const artists = useAppSelector((state) => state.search.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          items={artists}
          title={t('Artists')}
          onItemClick={(item) => {
            dispatch(searchHistoryActions.setItem(item));
          }}
        />
      </div>
    </div>
  );
});
