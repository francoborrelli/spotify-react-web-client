import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { homeActions } from '../../../../store/slices/home';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const FILTERS = ['PODCASTS', 'FOLLOWING'] as const;

export const PodcastSegmentedNav = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['home']);
  const podcastFilter = useAppSelector((state) => state.home.podcastFilter);

  return (
    <div className='podcast-segmented' role='tablist' aria-label={t('PODCASTS')}>
      {FILTERS.map((filter) => {
        const isActive =
          filter === 'PODCASTS' ? true : podcastFilter === 'FOLLOWING';
        const modifier = filter === 'PODCASTS' ? 'podcasts' : 'following';

        return (
          <button
            key={filter}
            type='button'
            role='tab'
            aria-selected={filter === 'PODCASTS' ? true : podcastFilter === 'FOLLOWING'}
            className={`podcast-segmented__btn podcast-segmented__btn--${modifier}${
              isActive ? ' podcast-segmented__btn--active' : ''
            }`}
            onClick={() => dispatch(homeActions.setPodcastFilter(filter))}
          >
            {t(filter)}
          </button>
        );
      })}
    </div>
  );
});
