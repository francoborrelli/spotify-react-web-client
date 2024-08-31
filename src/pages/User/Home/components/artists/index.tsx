import { memo } from 'react';
import { useAppSelector } from '../../../../../store/store';
import { GridItemList } from '../../../../../components/Lists/list';
import { useTranslation } from 'react-i18next';

export const MyArtistsSection = memo(() => {
  const [t] = useTranslation(['profile']);
  const user = useAppSelector((state) => state.auth.user);
  const artists = useAppSelector((state) => state.profile.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <GridItemList
        items={artists}
        title={t('Top artists this month')}
        subtitle={t('Only visible to you')}
        moreUrl={`/users/${user?.id}/artists`}
      />
    </div>
  );
});
