import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const PodcastFollowing = memo(() => {
  const { t } = useTranslation(['home']);

  return (
    <div className='podcasts-following' style={{ marginTop: 100 }}>
      <img
        className='podcasts-following__art'
        src='/images/no-episodes.png'
        alt=''
        width={280}
        height={140}
        loading='lazy'
      />
      <h2 className='podcasts-following__title'>{t('Podcast following title')}</h2>
      <p className='podcasts-following__description'>{t('Podcast following description')}</p>
      <Link className='podcasts-following__cta' to='/search'>
        {t('Explore podcasts')}
      </Link>
    </div>
  );
});
