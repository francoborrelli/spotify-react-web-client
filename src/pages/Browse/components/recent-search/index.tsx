import { memo } from 'react';

// Utils
import { useTranslation } from 'react-i18next';
import { GridItemList } from '../../../../components/Lists/list';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { searchHistoryActions } from '../../../../store/slices/searchHistory';

export const RecentSearchesActions = memo(() => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['search']);
  const items = useAppSelector((state) => state.searchHistory.items);

  if (!items || !items.length) {
    return null;
  }

  return (
    <div>
      <GridItemList
        items={items}
        title={t('Recent Searches')}
        onItemDelete={(item) => {
          dispatch(searchHistoryActions.removeItem(item));
        }}
        moreUrl={items.length > 7 ? '/recent-searches' : undefined}
      />
    </div>
  );
});