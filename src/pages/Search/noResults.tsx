import { FC, memo } from 'react';

import '../404/styles.scss';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NoSearchResults: FC<{ searchValue: string }> = memo((props) => {
  const navigate = useNavigate();
  const [t] = useTranslation(['search']);

  return (
    <div className='wrapper'>
      <div className='container'>
        <h3>{t('No results')}</h3>
        <p>
          {t('No results where found for')} "{props.searchValue}".
        </p>

        <button onClick={() => navigate('/')}>{t('Home')}</button>
      </div>
    </div>
  );
});

NoSearchResults.displayName = 'NoSearchResults';

export default NoSearchResults;
