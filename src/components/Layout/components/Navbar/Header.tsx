import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';

const Header = ({ opacity }: { opacity: number; title?: string }) => {
  const { t } = useTranslation(['navbar']);

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
            href='https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=francoborrelli96@gmail.com&su=SUBJECT'
          >
            <span>{t('Contact me')}</span>
          </a>

          {/*
          <div className='news'>
            <News />
          </div> */}

          <div className='avatar-container'>
            <Link to='/profile'>
              <img
                className='avatar'
                id='user-avatar'
                alt='User Avatar'
                style={{ marginTop: -1 }}
                src={`${process.env.PUBLIC_URL}/images/profile.jpeg`}
              />
            </Link>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Header;
