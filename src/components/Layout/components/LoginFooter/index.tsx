import { memo } from 'react';
import { WhiteButton } from '../../../Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../store/store';
import { loginToSpotify } from '../../../../store/slices/auth';

export const LoginFooter = memo(() => {
  const [t] = useTranslation(['home']);
  const dispatch = useAppDispatch();

  return (
    <div className='login-footer' style={{ margin: '0px 10px' }}>
      <div className='login-container'>
        <div>
          <p className='title'>{t('Preview')}</p>
          <p className='description'>{t('Log In to access all the features of the app')}.</p>
        </div>

        <WhiteButton title={t('Log In')} onClick={() => dispatch(loginToSpotify(false))} />
      </div>
    </div>
  );
});
