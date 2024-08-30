import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';

import { memo, type FC } from 'react';

import { GridItemList } from '../../../../components/Lists/list';
import { getItemDescription } from '../../../../utils/getDescription';

interface RecentlyPlayedProps {}

export const RecentlyPlayed: FC<RecentlyPlayedProps> = memo(() => {
  const { t } = useTranslation(['home']);
  const recentlyPlayed = useAppSelector((state) => state.home.recentlyPlayed);

  if (!recentlyPlayed || !recentlyPlayed.length) return null;

  return (
    <div className='home'>
      <GridItemList
        title={`${t('Recently played')}`}
        items={recentlyPlayed.slice(0, 10)}
        getDescription={getItemDescription}
      />
    </div>
  );
});
