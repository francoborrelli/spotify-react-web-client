// Components
import { GridItemList } from '../../../../components/Lists/list';

// Utils
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';

// Components
import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

// Interfaces
import { useMemo, type FC } from 'react';

interface NewReleasesProps {}

export const TopMixes: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);

  const madeForYou = useAppSelector((state) => state.home.madeForYou);

  const items = useMemo(
    () => madeForYou.filter((p) => p.name?.toLowerCase().includes('mix')).slice(0, 12),
    [madeForYou]
  );

  if (!items || !items.length) return null;

  return (
    <div className='home'>
      <GridItemList
        items={items}
        title={t('Your top mixes')}
        moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
