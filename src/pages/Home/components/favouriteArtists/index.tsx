import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';

import { memo, useMemo, type FC } from 'react';

import { HomeItemList } from '../HomeItemList';

interface NewReleasesProps {}

export const FavouriteArtists: FC<NewReleasesProps> = memo(() => {
  const { t } = useTranslation(['home']);
  const artists = useAppSelector((state) => state.yourLibrary.myArtists);

  const items = useMemo(() => {
    return artists.slice(0, 12);
  }, [artists]);

  if (!artists || !artists.length) return null;

  return (
    <div className='home'>
      <HomeItemList items={items} title={`${t('Your favourite artists')}`} />
    </div>
  );
});
