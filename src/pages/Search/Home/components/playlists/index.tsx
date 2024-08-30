import { memo } from 'react';

// Utils
import { useTranslation } from 'react-i18next';
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
          items={playlists}
          title={t('Playlists')}
          getDescription={(item: any) => {
            if (item.type === 'playlist') return `By ${item.owner?.display_name}`;
            return '';
          }}
        />
      </div>
    </div>
  );
});
