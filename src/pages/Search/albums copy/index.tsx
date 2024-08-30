import { memo } from 'react';

// Utils
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';
import { GridItemList } from '../../../components/Lists/list';

export const AlbumsSearchSection = memo(() => {
  const [t] = useTranslation(['search']);
  const albums = useAppSelector((state) => state.search.albums);

  if (!albums || !albums.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList items={albums} title={t('Albums')} />
      </div>
    </div>
  );
});
