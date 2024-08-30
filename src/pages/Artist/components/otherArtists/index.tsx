import { memo } from 'react';

// Components
import { ItemsList } from '../../../Home/components/list';

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
        <ItemsList items={artists} title={t('Fans also like')} />
      </div>
    </div>
  );
});