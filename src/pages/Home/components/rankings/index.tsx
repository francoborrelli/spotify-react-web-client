// Components
import { GridItemList } from '../../../../components/Lists/list';

// Utils
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';

// Components
import { RANKING_URI } from '../../../../constants/spotify';

// Interfaces
import { type FC } from 'react';

interface NewReleasesProps {}

export const Rankings: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);
  const rankings = useAppSelector((state) => state.home.rankings);

  if (!rankings || !rankings.length) return null;

  return (
    <div className='home'>
      <GridItemList
        items={rankings}
        title={`${t('Featured Charts')}`}
        moreUrl={`/genre/${RANKING_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
