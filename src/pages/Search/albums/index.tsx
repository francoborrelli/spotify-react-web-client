import { memo } from 'react';

// Utils
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';
import { ItemsList } from '../../Home/components/list';

export const AlbumsSearchSection = memo(() => {
  const [t] = useTranslation(['search']);
  const albums = useAppSelector((state) => state.search.albums);

  if (!albums || !albums.length) {
    return null;
  }

  return (
    <div>
      <div>
        <ItemsList items={albums} title={t('Albums')} />
      </div>
    </div>
  );
});
