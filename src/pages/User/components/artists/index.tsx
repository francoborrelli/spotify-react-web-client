import { memo } from 'react';
import { useAppSelector } from '../../../../store/store';
import { GridItemList } from '../../../../components/Lists/list';
import { useTranslation } from 'react-i18next';

export const MyArtistsSection = memo(() => {
  const [t] = useTranslation(['profile']);
  const artists = useAppSelector((state) => state.profile.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <GridItemList
        title={t('Top artists this month')}
        subtitle={t('Only visible to you')}
        items={artists}
      />
    </div>
  );
});
