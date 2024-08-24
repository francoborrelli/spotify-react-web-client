import { FC, memo } from 'react';

import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Page404: FC = memo(() => {
  const navigate = useNavigate();
  const [t] = useTranslation(['errors']);

  return (
    <div className='wrapper'>
      <div className='container'>
        <h3>{t('Page not available')}</h3>
        <p>{t('Something went wrong, please try again later.')}</p>

        <button onClick={() => navigate('/')}>{t('Home')}</button>
      </div>
    </div>
  );
});

Page404.displayName = 'Page404';

export default Page404;
