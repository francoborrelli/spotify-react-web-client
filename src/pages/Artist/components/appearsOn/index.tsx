import { memo } from 'react';

// Components
import { ItemsList } from '../../../Home/components/list';

// Redux
import { useAppSelector } from '../../../../store/store';

// Utils
import { useTranslation } from 'react-i18next';

export const AppearsOn = memo(() => {
  const [t] = useTranslation(['artist']);
  const tracks = useAppSelector((state) => state.artist.appearsOn);

  return (
    <div>
      <div>
        <ItemsList items={tracks} title={t('Appears on')} />
      </div>
    </div>
  );
});
