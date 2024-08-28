import { memo } from 'react';
import { useAppSelector } from '../../../../store/store';
import { ItemsList } from '../../../Home/components/list';

export const AppersOn = memo(() => {
  const tracks = useAppSelector((state) => state.artist.appearsOn);

  return (
    <div>
      <div>
        <ItemsList items={tracks} title='Appers on' />
      </div>
    </div>
  );
});
