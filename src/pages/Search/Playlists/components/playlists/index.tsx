import { memo } from 'react';

import { useTranslation } from 'react-i18next';

// Utils
import { useAppSelector } from '../../../../../store/store';
import { GridItemList } from '../../../../../components/Lists/list';

export const PlaylistsSearchSection = memo(() => {
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
