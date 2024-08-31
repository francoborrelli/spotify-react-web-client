import { memo, useCallback } from 'react';

// Components
import { GridItemList } from '../../../../components/Lists/list';

// Utils
import { useTranslation } from 'react-i18next';
import { getItemDescription } from '../../../../utils/getDescription';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { searchHistoryActions } from '../../../../store/slices/searchHistory';
import { Link } from 'react-router-dom';

const CONTAINER_STYLES = {
  padding: 20,
  paddingTop: 30,
  maxHeight: 260,
} as const;

export const RecentlySearchedContent = memo((props: { color: string }) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['search']);
  const items = useAppSelector((state) => state.searchHistory.items);

  const onDelete = useCallback(
    (item: any) => {
      dispatch(searchHistoryActions.removeItem(item));
    },
    [dispatch]
  );

  const clearAllButton = (
    <Link
      to='/search'
      className='clearRecentSearches'
      onClick={() => {
        dispatch(searchHistoryActions.clearItems());
      }}
    >
      <span>{t('Clear recent searches')}</span>
    </Link>
  );

  return (
    <div style={CONTAINER_STYLES} className='recent-searches-list'>
      <GridItemList
        items={items}
        extra={clearAllButton}
        onItemDelete={onDelete}
        title={t('Recent searches')}
        getDescription={getItemDescription}
      />
    </div>
  );
});

RecentlySearchedContent.displayName = 'RecentlySearchedContent';

export default RecentlySearchedContent;
