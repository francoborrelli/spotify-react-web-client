import { useCallback } from 'react';

import { Popconfirm, Space } from 'antd';
import { Link } from 'react-router-dom';
import { CloseIcon } from '../../../Icons';
import { WhiteButton } from '../../../Button';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { uiActions } from '../../../../store/slices/ui';
import { loginToSpotify } from '../../../../store/slices/auth';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

// Constants
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';
import useIsMobile from '../../../../utils/isMobile';

const LoginButton = () => {
  const { t } = useTranslation(['home']);
  const dispatch = useAppDispatch();
  const tooltipOpen = useAppSelector((state) => state.ui.loginButtonOpen);

  const onClose = useCallback(() => {
    dispatch(uiActions.closeLoginButton());
  }, [dispatch]);

  return (
    <Popconfirm
      icon={null}
      open={tooltipOpen}
      onCancel={onClose}
      placement='bottomLeft'
      rootClassName='login-tooltip'
      cancelText={<CloseIcon />}
      title={t('You’re logged out')}
      cancelButtonProps={{ type: 'text' }}
      okButtonProps={{ className: 'white-button small' }}
      description={t('Log in to add this to your Liked Songs.')}
    >
      <WhiteButton title={t('Log In')} onClick={() => dispatch(loginToSpotify(false))} />
    </Popconfirm>
  );
};

const Header = ({ opacity }: { opacity: number; title?: string }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation(['navbar']);

  const user = useAppSelector(
    (state) => state.auth.user,
    (prev, next) => prev?.id === next?.id
  );

  return (
    <div
      className={`flex r-0 w-full flex-row items-center justify-between bg-gray-900 rounded-t-md z-10`}
      style={{ backgroundColor: `rgba(12, 12, 12, ${opacity}%)` }}
    >
      <div className='flex flex-row items-center'>
        <Space>
          {!isMobile ? (
            <a
              target='_blank'
              rel='noreferrer'
              className='contact-me'
              href='https://github.com/francoborrelli/spotify-react-web-client'
            >
              <span>{t('Source code')}</span>
            </a>
          ) : null}

          {/*
          <div className='news'>
            <News />
          </div> */}

          {user ? (
            <div className='avatar-container'>
              <Link to={`/users/${user!.id}`}>
                <img
                  className='avatar'
                  id='user-avatar'
                  alt='User Avatar'
                  style={{ marginTop: -1 }}
                  src={
                    user?.images && user.images.length ? user.images[0].url : ARTISTS_DEFAULT_IMAGE
                  }
                />
              </Link>
            </div>
          ) : (
            <LoginButton />
          )}
        </Space>
      </div>
    </div>
  );
};

export default Header;
