import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { WhiteButton } from '../../../../Button';
import { useAppDispatch } from '../../../../../store/store';
import { DetailsCard } from '../../NowPlaying/Details/card';
import { loginToSpotify } from '../../../../../store/slices/auth';

export const LibraryLoginInfo = memo(() => {
  const [t] = useTranslation(['home']);
  const dispatch = useAppDispatch();

  return (
    <DetailsCard title={t(`Let's access your library`)}>
      <p style={{ fontWeight: 400, color: '#fff' }}>
        {t(`Log In to access all the features of the app`)}
      </p>
      <div style={{ marginTop: 20, marginBottom: 30, position: 'relative' }}>
        <WhiteButton title={t('Log In')} onClick={() => dispatch(loginToSpotify(false))} />
      </div>
    </DetailsCard>
  );
});
