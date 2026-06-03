import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { HomeItemList } from '../HomeItemList';

// Interfaces
import type { FC } from 'react';

interface NewReleasesProps {}

export const NewReleases: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);
  const newReleases = useAppSelector((state) => state.home.newReleases);

  if (!newReleases || !newReleases.length) return null;

  return (
    <div className='home'>
      <HomeItemList title={`${t('New releases')}`} items={newReleases} />
    </div>
  );
};
