// Components
import { GridItemList } from '../../../../components/Lists/list';

// Utils
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';

// Components
import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

// Interfaces
import type { FC } from 'react';

interface NewReleasesProps {}

export const MadeForYou: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);

  const user = useAppSelector((state) => state.auth.user);
  const madeForYou = useAppSelector((state) => state.home.madeForYou);

  if (!madeForYou || !madeForYou.length) return null;

  return (
    <div className='home'>
      <GridItemList
        items={madeForYou}
        moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
        getDescription={getPlaylistDescription}
        title={`${t('Made for')} ${user?.display_name}`}
      />
    </div>
  );
};
