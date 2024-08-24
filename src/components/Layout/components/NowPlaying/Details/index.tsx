import { Avatar, Image, Space } from 'antd';
import { NowPlayingCard } from './card';
import { Tooltip } from '../../../../Tooltip';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

import { NowPlayingLayout } from '../layout';
import { useTranslation } from 'react-i18next';

// Interfaces
import type { FC } from 'react';
import type { Song } from '../../../../../interfaces/types';

import { PiCertificateFill } from 'react-icons/pi';
import { FaGithub, FaLink, FaYoutube } from 'react-icons/fa6';
import { libraryActions } from '../../../../../store/slices/library';
import { SKILLS_SONGS } from '../../../../../constants/cv/skills';

import shuffle from 'lodash/shuffle';

import parse from 'html-react-parser';
import { RelatedSong } from './related';

const Profile: FC<{ song: Song }> = ({ song }) => {
  const [t] = useTranslation(['cv']);

  const hasButtons = song.link || song.github || song.youtube || song.certificate;

  return (
    <NowPlayingCard title={t(song.name)!} subtitle={t(song.artist || '')} image={song.imageUrl}>
      {song.explanation
        ? t(song.explanation || '')
            .split('\n')
            .map((bullet, index) => (
              <div className='playing-now-card-body' key={index}>
                {parse(bullet)}
              </div>
            ))
        : null}
      {hasButtons ? (
        <Space style={{ marginTop: 10 }}>
          {song.link ? (
            <Tooltip title={t('WEB_SITE')} placement='top'>
              <a target={'_blank'} href={song.link} className='link-social-button' rel='noreferrer'>
                <FaLink />
              </a>
            </Tooltip>
          ) : null}

          {song.certificate ? (
            <Tooltip title={t('Certificate')} placement='top'>
              <a
                target={'_blank'}
                href={song.certificate}
                className='link-social-button'
                rel='noreferrer'
              >
                <PiCertificateFill />
              </a>
            </Tooltip>
          ) : null}

          {song.youtube ? (
            <Tooltip title={t('Youtube')} placement='top'>
              <a
                target={'_blank'}
                href={song.youtube}
                className='link-social-button'
                rel='noreferrer'
              >
                <FaYoutube />
              </a>
            </Tooltip>
          ) : null}

          {song.github ? (
            <Tooltip title={t('Github')} placement='top'>
              <a
                target={'_blank'}
                href={song.github}
                className='link-social-button'
                rel='noreferrer'
              >
                <FaGithub />
              </a>
            </Tooltip>
          ) : null}
        </Space>
      ) : null}
    </NowPlayingCard>
  );
};

const Experience: FC<{ song: Song }> = ({ song }) => {
  const [t] = useTranslation(['playingBar']);
  const [tcv] = useTranslation(['cv']);

  if (!song.experience) return null;

  return (
    <NowPlayingCard title={t('Experience')}>
      {tcv(song.experience)
        .split('\n')
        .map((bullet, index) => (
          <div className='playing-now-card-body' key={index}>
            {bullet}
          </div>
        ))}
    </NowPlayingCard>
  );
};

const Description: FC<{ song: Song }> = ({ song }) => {
  const [t] = useTranslation(['playingBar']);
  const [tcv] = useTranslation(['cv']);

  if (!song.description) return null;

  return (
    <NowPlayingCard title={t('Description')}>
      {tcv(song.description)
        .split('\n')
        .map((bullet, index) => (
          <div className='playing-now-card-body' key={index}>
            {parse(bullet)}
          </div>
        ))}
    </NowPlayingCard>
  );
};

const Skills: FC<{ song: Song }> = ({ song }) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['playingBar']);

  if (!song.skills || !song.skills.length) return null;

  return (
    <NowPlayingCard title={t('Skills')}>
      {(song.skills || []).map((tag) => (
        <Tooltip title={tag.text} placement='top' key={tag.text}>
          <button
            onClick={() => {
              dispatch(
                libraryActions.setSongPlaying(SKILLS_SONGS.find((s) => s.name === tag.text))
              );
            }}
          >
            <Avatar style={{ backgroundColor: '#5c5c5c26' }} icon={tag.icon} />
          </button>
        </Tooltip>
      ))}
    </NowPlayingCard>
  );
};

const Images: FC<{ song: Song }> = ({ song }) => {
  const [t] = useTranslation(['playingBar']);
  if (!song.images || !song.images.length) return null;

  return (
    <NowPlayingCard title={t('Images')}>
      <Image.PreviewGroup items={song.images}>
        <Image width={'100%'} src={song.images[0]} />
      </Image.PreviewGroup>
    </NowPlayingCard>
  );
};

const RelatedSongs: FC<{ song: Song }> = ({ song }) => {
  const [t] = useTranslation(['playingBar']);
  if (!song.relatedSongs || !song.relatedSongs.length) return null;

  return (
    <NowPlayingCard title={t('Related projects')}>
      {shuffle(song.relatedSongs)
        .slice(0, 3)
        .map((relatedSong) => (
          <RelatedSong key={relatedSong.name} song={relatedSong} />
        ))}
    </NowPlayingCard>
  );
};

export const Details = () => {
  const song = useAppSelector((state) => state.library.songPlaying);

  if (!song) return null;

  return (
    <NowPlayingLayout>
      <Profile song={song} />
      <Skills song={song} />
      <Description song={song} />
      <Experience song={song} />
      <Images song={song} />
      <RelatedSongs song={song} />
    </NowPlayingLayout>
  );
};
