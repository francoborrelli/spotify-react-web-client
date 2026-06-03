import { memo, type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../../store/store';
import { EpisodeCard } from './EpisodeCard';

export const Podcasts: FC = memo(() => {
  const { t } = useTranslation(['home']);
  const episodesMightLike = useAppSelector((state) => state.home.episodesMightLike);
  const episodesToTry = useAppSelector((state) => state.home.episodesToTry);

  if (!episodesMightLike.length && !episodesToTry.length) {
    return null;
  }

  return (
    <div className='home podcasts-home'>
      <div className='podcasts-home__grid'>
        {episodesMightLike.length ? (
          <section className='podcasts-home__section'>
            <h2 className='podcasts-section-title'>{t('Episodes you might like')}</h2>
            <div className='podcasts-section-cards'>
              {episodesMightLike.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          </section>
        ) : null}

        {episodesToTry.length ? (
          <section className='podcasts-home__section'>
            <h2 className='podcasts-section-title'>{t('Episodes to try')}</h2>
            <div className='podcasts-section-cards'>
              {episodesToTry.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
});
