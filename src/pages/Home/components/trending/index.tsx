// Components
import { GridItemList } from '../../../../components/Lists/list';

// Utils
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';

// Components
import { TRENDING_URI } from '../../../../constants/spotify';

// Interfaces
import { memo, type FC } from 'react';

interface NewReleasesProps {}

export const Trending: FC<NewReleasesProps> = memo(() => {
  const { t } = useTranslation(['home']);
  const user = useAppSelector((state) => !!state.auth.user);
  const trending = useAppSelector((state) => state.home.trending);

  if (user || !trending || !trending.length) return null;

  return (
    <div className='home'>
      <GridItemList
        items={trending}
        title={`${t('Trending')}`}
        moreUrl={`/genre/${TRENDING_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
});
