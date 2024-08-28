import { Input, Space } from 'antd';
import NavigationButton from './NavigationButton';
import { ActiveHomeIcon, BrowseIcon, HomeIcon, SearchIcon } from '../../../Icons';

// Utils
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const INITIAL_VALUE = window.location.href.includes('/search/')
  ? window.location.href.split('/').reverse()[0]
  : '';

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(['navbar']);

  const isHome = useMemo(() => location.pathname === '/', [location.pathname]);

  return (
    <Space size={10} align='center'>
      <NavigationButton
        text={t('Home')}
        icon={isHome ? <ActiveHomeIcon /> : <HomeIcon />}
        onClick={() => navigate('/')}
      />

      <Input
        size='large'
        className='search-input'
        prefix={<SearchIcon />}
        suffix={
          <button
            onClick={() => {
              navigate('/browse');
            }}
          >
            <BrowseIcon />
          </button>
        }
        defaultValue={INITIAL_VALUE}
        placeholder={t('SearchPlaceholder')}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            navigate('/browse');
          } else {
            navigate(`/search/${e.target.value}`);
          }
        }}
      />
    </Space>
  );
};
