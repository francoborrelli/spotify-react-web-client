import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { GridItemList } from '../../../../components/Lists/list';

// Interfaces
import type { FC } from 'react';

interface NewReleasesProps {}

export const NewReleases: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);
  const newReleases = useAppSelector((state) => state.home.newReleases);

  if (!newReleases || !newReleases.length) return null;

  return (
    <div className='home'>
      <GridItemList title={`${t('New releases')}`} items={newReleases} />
    </div>
  );
};
