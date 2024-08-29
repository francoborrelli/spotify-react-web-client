import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';

import type { FC } from 'react';

import { ItemsList } from '../components/list';
import { getPlaylistDescription } from '../../../utils/getDescription';

interface NewReleasesProps {}

export const MadeForYou: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);

  const user = useAppSelector((state) => state.auth.user);
  const madeForYou = useAppSelector((state) => state.home.madeForYou);

  if (!madeForYou || !madeForYou.length) return null;

  return (
    <div className='home'>
      <ItemsList
        items={madeForYou}
        getDescription={getPlaylistDescription}
        title={`${t('Made for')} ${user?.display_name}`}
      />
    </div>
  );
};
