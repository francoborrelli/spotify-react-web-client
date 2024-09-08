import { Space } from 'antd';
import { Link } from 'react-router-dom';
import { WhiteButton } from '../../../Button';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { loginToSpotify } from '../../../../store/slices/auth';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

// Constants
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';

const Header = ({ opacity }: { opacity: number; title?: string }) => {
  const { t } = useTranslation(['navbar']);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div
      className={`flex r-0 w-full flex-row items-center justify-between bg-gray-900 rounded-t-md z-10`}
      style={{ backgroundColor: `rgba(12, 12, 12, ${opacity}%)` }}
    >
      <div className='flex flex-row items-center'>
        <Space>
          <a
            target='_blank'
            rel='noreferrer'
            className='contact-me'
            href='https://github.com/francoborrelli/spotify-react-web-client'
          >
            <span>{t('Source code')}</span>
          </a>

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
            <WhiteButton title={t('Log In')} onClick={() => dispatch(loginToSpotify(false))} />
          )}
        </Space>
      </div>
    </div>
  );
};

export default Header;
