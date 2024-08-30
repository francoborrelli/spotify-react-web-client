import { memo } from 'react';

// Utils
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../store/store';
import { GridItemList } from '../../../../../components/Lists/list';

export const ArtistsSearchSection = memo(() => {
  const [t] = useTranslation(['search']);
  const artists = useAppSelector((state) => state.search.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList items={artists} title={t('Artists')} />
      </div>
    </div>
  );
});
