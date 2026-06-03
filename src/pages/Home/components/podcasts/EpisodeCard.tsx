import { Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import dayjs from 'dayjs';
import tinycolor from 'tinycolor2';
import { memo, useCallback, useEffect, useMemo, useState, type FC, type MouseEvent } from 'react';

import { AddToLibrary, MenuDots, Pause, Play } from '../../../../components/Icons';
import { episodesService } from '../../../../services/episodes';
import { playerService } from '../../../../services/player';
import type { Episode } from '../../../../interfaces/episode';
import { formatEpisodeDuration } from '../../../../utils';
import { getImageAnalysis2 } from '../../../../utils/imageAnyliser';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';

interface EpisodeCardProps {
  episode: Episode;
}

const DEFAULT_GRADIENT = 'linear-gradient(180deg, #3d3d3d 0%, #282828 100%)';

export const EpisodeCard: FC<EpisodeCardProps> = memo(({ episode }) => {
  const dispatch = useAppDispatch();
  const [gradient, setGradient] = useState(DEFAULT_GRADIENT);

  const user = useAppSelector((state) => !!state.auth.user);
  const paused = useAppSelector((state) => state.spotify.state?.paused);
  const currentId = useAppSelector((state) => state.spotify.state?.track_window.current_track.id);
  const isCurrent = currentId === episode.id;
  const isPlaying = isCurrent && !paused;

  const imageUrl = episode.images[0]?.url;
  const releaseLabel = useMemo(
    () => dayjs(episode.release_date).format('MMM D'),
    [episode.release_date]
  );
  const durationLabel = formatEpisodeDuration(episode.duration_ms);
  const show = episode.show;
  const showName = show?.name || show?.publisher || 'Podcast';
  const isVideo = show?.media_type?.toLowerCase().includes('video') ?? false;
  const playContext = useMemo(() => ({ uris: [episode.uri] }), [episode.uri]);

  useEffect(() => {
    if (!imageUrl) return;

    getImageAnalysis2(imageUrl).then((rgb) => {
      let color = tinycolor(rgb);
      while (color.isLight()) {
        color = color.darken(12);
      }
      const hex = color.toHexString();
      const darker = color.clone().darken(18).toHexString();
      setGradient(`linear-gradient(180deg, ${hex} 0%, ${darker} 100%)`);
    });
  }, [imageUrl]);

  const handlePlay = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      if (!user && imageUrl) {
        dispatch(uiActions.openLoginModal(imageUrl));
        return;
      }

      if (isCurrent && !paused) {
        playerService.pausePlayback();
        return;
      }

      const request = isCurrent
        ? playerService.startPlayback()
        : playerService.startPlayback(playContext);
      request.then();
    },
    [user, imageUrl, isCurrent, paused, playContext, dispatch]
  );

  const handleSave = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      episodesService
        .saveEpisodes([episode.id])
        .then(() => message.success('Episode saved to Your Episodes'))
        .catch(() => message.error('Could not save episode'));
    },
    [episode.id]
  );

  const menuItems: MenuProps['items'] = [
    {
      key: 'open',
      label: (
        <a href={episode.external_urls?.spotify} target='_blank' rel='noreferrer'>
          Open in Spotify
        </a>
      ),
    },
    ...(show?.external_urls?.spotify
      ? [
          {
            key: 'show',
            label: (
              <a href={show.external_urls.spotify} target='_blank' rel='noreferrer'>
                Go to show
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <article
      className='episode-card relative rounded-lg transition'
      style={{ background: gradient }}
    >
      <div className='episode-card__header'>
        {imageUrl ? (
          <img className='episode-card__cover' src={imageUrl} alt={episode.name} />
        ) : null}
        <div className='episode-card__titles'>
          <h3 className='episode-card__title' title={episode.name}>
            {episode.name}
          </h3>
          <div className='episode-card__show'>
            {isVideo ? (
              <span className='episode-card__video-badge' aria-hidden>
                <svg viewBox='0 0 16 16' width={14} height={14}>
                  <path d='M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z' />
                </svg>
              </span>
            ) : null}
            <span className='episode-card__show-label'>{isVideo ? 'Video' : 'Podcast'}</span>
            <span className='episode-card__show-name' title={showName}>
              {showName}
            </span>
          </div>
        </div>
      </div>

      <div className='episode-card__footer'>
        <div className='episode-card__body'>
          <p className='episode-card__meta'>
            {releaseLabel} • {durationLabel}
          </p>
          <p className='episode-card__description'>{episode.description}</p>
        </div>

        <div className='episode-card__actions'>
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <button
              type='button'
              className='episode-card__icon-btn'
              aria-label='More options'
              onClick={(e) => e.stopPropagation()}
            >
              <MenuDots />
            </button>
          </Dropdown>
          <button
            type='button'
            className='episode-card__icon-btn'
            aria-label='Save episode'
            onClick={handleSave}
          >
            <AddToLibrary height={24} width={24} />
          </button>
          <button
            type='button'
            className='episode-card__play-btn'
            aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
            onClick={handlePlay}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
    </article>
  );
});
