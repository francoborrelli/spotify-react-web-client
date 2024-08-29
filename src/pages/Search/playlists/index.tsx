import { memo } from 'react';

// Utils
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';
import { ItemsList } from '../../Home/components/list';

export const PlaylistsSearchSection = memo(() => {
  const [t] = useTranslation(['search']);
  const playlists = useAppSelector((state) => state.search.playlists);

  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <ItemsList
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
