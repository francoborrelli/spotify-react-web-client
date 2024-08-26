import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';

import type { FC } from 'react';

import { ItemsList } from '../components/list';

interface NewReleasesProps {}

export const FeaturePlaylists: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);
  const featurePlaylists = useAppSelector((state) => state.home.featurePlaylists);

  return (
    <div className='home'>
      <ItemsList title={`${t('Feature playlists')}`} items={featurePlaylists} />
    </div>
  );
};
