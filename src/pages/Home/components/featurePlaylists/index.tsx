import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';

import type { FC } from 'react';

import { GridItemList } from '../../../../components/Lists/list';
import { getPlaylistDescription } from '../../../../utils/getDescription';

interface NewReleasesProps {}

export const FeaturePlaylists: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);
  const featurePlaylists = useAppSelector((state) => state.home.featurePlaylists);

  if (!featurePlaylists || !featurePlaylists.length) return null;

  return (
    <div className='home'>
      <GridItemList
        items={featurePlaylists}
        title={`${t('Featured playlists')}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
