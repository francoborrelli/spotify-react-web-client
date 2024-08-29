import { memo } from 'react';

// Utils
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';
import { ItemsList } from '../../Home/components/list';

export const ArtistsSearchSection = memo(() => {
  const [t] = useTranslation(['search']);
  const artists = useAppSelector((state) => state.search.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <ItemsList items={artists} title={t('Artists')} />
      </div>
    </div>
  );
});
