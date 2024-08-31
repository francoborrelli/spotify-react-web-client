import { memo } from 'react';

import { useTranslation } from 'react-i18next';

// Components
import { GridItemList } from '../../../../../components/Lists/list';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { searchHistoryActions } from '../../../../../store/slices/searchHistory';

export const PlaylistsSearchSection = memo(() => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['search']);
  const playlists = useAppSelector((state) => state.search.playlists);

  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={playlists}
          onItemClick={(item) => {
            dispatch(searchHistoryActions.setItem(item));
          }}
          getDescription={(item) => {
            if (item.type === 'playlist') {
              return `${t('By')} ${item.owner?.display_name}`;
            }
            return '';
          }}
        />
      </div>
    </div>
  );
});
