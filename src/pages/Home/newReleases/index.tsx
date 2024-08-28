import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';

import type { FC } from 'react';

import { ItemsList } from '../components/list';

interface NewReleasesProps {}

export const NewReleases: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);
  const newReleases = useAppSelector((state) => state.home.newReleases);

  if (!newReleases || !newReleases.length) return null;

  return (
    <div className='home'>
      <ItemsList title={`${t('New releases')}`} items={newReleases} />
    </div>
  );
};
