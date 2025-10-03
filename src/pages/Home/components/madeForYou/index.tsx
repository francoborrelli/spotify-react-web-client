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

export const MadeForYou: FC<NewReleasesProps> = () => {
  const { t } = useTranslation(['home']);

  const user = useAppSelector((state) => state.auth.user);
  const madeForYou = useAppSelector((state) => state.home.madeForYou);

  const items = useMemo(() => {
    const items = madeForYou.filter(
      (p) => !p.name?.toLowerCase().includes('mix') || !p.images || p.images.length === 0
    );
    const otherItems = madeForYou
      .filter((p) => p.name?.toLowerCase().includes('mix') || !p.images || p.images.length === 0)
      .reverse();
    return [...items, ...otherItems].slice(0, 12);
  }, [madeForYou]);

  if (!items || !items.length) return null;

  return (
    <div className='home'>
      <GridItemList
        items={items}
        moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
        getDescription={getPlaylistDescription}
        title={`${t('Made for')} ${user?.display_name || t('you')}`}
      />
    </div>
  );
};
