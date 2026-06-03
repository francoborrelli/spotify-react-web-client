import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Chip from '../../../../components/Chip';
import { homeActions } from '../../../../store/slices/home';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

export const PodcastSegmentedNav = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);
  const podcastFilter = useAppSelector((state) => state.home.podcastFilter);

  return (
    <div className='podcast-segmented' role='tablist' aria-label={t('PODCASTS')}>
      <Chip
        text={t('PODCASTS')}
        active
        onClick={() => dispatch(homeActions.setPodcastFilter('PODCASTS'))}
      />
      <button
        type='button'
        role='tab'
        aria-selected={podcastFilter === 'FOLLOWING'}
        className={`podcast-segmented__btn podcast-segmented__btn--following${
          podcastFilter === 'FOLLOWING' ? ' podcast-segmented__btn--active' : ''
        }`}
        onClick={() => dispatch(homeActions.setPodcastFilter('FOLLOWING'))}
      >
        {t('FOLLOWING')}
      </button>
    </div>
  );
});
