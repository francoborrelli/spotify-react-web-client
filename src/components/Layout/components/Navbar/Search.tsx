import { Input, Space } from 'antd';
import NavigationButton from './NavigationButton';
import { ActiveHomeIcon, BrowseIcon, HomeIcon, SearchIcon } from '../../../Icons';

// Utils
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

const INITIAL_VALUE = window.location.href.includes('/search/')
  ? window.location.href.split('/').reverse()[0]
  : '';

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(['navbar']);

  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedValue] = useDebounce(inputValue, 600);

  useEffect(() => {
    if (debouncedValue !== '') {
      navigate(`/search/${debouncedValue}`);
    }
  }, [debouncedValue, navigate]);

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
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder={t('SearchPlaceholder')}
      />
    </Space>
  );
};
