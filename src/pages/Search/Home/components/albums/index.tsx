import { memo } from 'react';

// Utils
import { useTranslation } from 'react-i18next';

// Components
import { GridItemList } from '../../../../../components/Lists/list';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { searchHistoryActions } from '../../../../../store/slices/searchHistory';

export const AlbumsSearchSection = memo(() => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['search']);
  const albums = useAppSelector((state) => state.search.albums);

  if (!albums || !albums.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          items={albums}
          title={t('Albums')}
          onItemClick={(item) => {
            dispatch(searchHistoryActions.setItem(item));
          }}
        />
      </div>
    </div>
  );
});
