import { memo } from 'react';

// Components
import { GridItemList } from '../../../../components/Lists/list';

// Redux
import { useAppSelector } from '../../../../store/store';

// Utils
import { useTranslation } from 'react-i18next';

export const AppearsOn = memo(() => {
  const [t] = useTranslation(['artist']);
  const tracks = useAppSelector((state) => state.artist.appearsOn);

  if (!tracks.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList items={tracks} title={t('Appears on')} />
      </div>
    </div>
  );
});
