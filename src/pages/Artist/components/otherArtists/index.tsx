import { memo } from 'react';

// Components
import { GridItemList } from '../../../../components/Lists/list';

// Redux
import { useAppSelector } from '../../../../store/store';

// Utils
import { useTranslation } from 'react-i18next';

export const OtherArtists = memo(() => {
  const [t] = useTranslation(['artist']);
  const artists = useAppSelector((state) => state.artist.otherArtists);

  return (
    <div>
      <div>
        <GridItemList items={artists} title={t('Fans also like')} />
      </div>
    </div>
  );
});
