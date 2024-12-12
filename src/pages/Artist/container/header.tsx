import { FC, memo, useEffect, useState } from 'react';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useAppSelector } from '../../../store/store';

const VerifiedIcon = () => (
  <svg
    role='img'
    aria-hidden='true'
    viewBox='0 0 24 24'
    data-encore-id='icon'
    className='Svg-sc-ytk21e-0 ZxtYq b0NcxAbHvRbqgs2S8QDg'
  >
    <path d='M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z'></path>
  </svg>
);

export const ArtistHeader: FC<{
  color: string;
  container: React.RefObject<HTMLDivElement | null>;
}> = memo((props) => {
  const [t] = useTranslation(['artist']);
  const { container, color } = props;

  const [scroll, setScroll] = useState(0);
  const artist = useAppSelector((state) => state.artist.artist);

  useEffect(() => {
    const ref = container.current;
    const handleScroll = () => {
      if (ref) {
        setScroll(ref.scrollTop / 100);
      }
    };
    ref?.addEventListener('scroll', handleScroll);
    return () => {
      ref?.removeEventListener('scroll', handleScroll);
    };
  }, [container]);

  return (
    <div className='artist-page-header' style={{ position: 'relative' }}>
      <div className='under-main-view'>
        <div
          style={{
            // @ts-ignore
            '--scroll': scroll,
          }}
        >
          <div
            className='background'
            style={{ backgroundImage: `url("${artist?.images[0]?.url}")` }}
          />
          <div
            className='background-image'
            style={{
              backgroundImage: `url("${artist?.images[0]?.url}")`,
            }}
          ></div>
          <div
            className='background-gradient'
            style={{
              // @ts-ignore
              '--bgColor': color,
            }}
          ></div>
        </div>
      </div>

      <div className='text-section'>
        <div className='contentSpacing'>
          <div></div>
          <div className='textContainer'>
            <span className='verifyContainer'>
              <div className='verifyDiv'></div>
              <VerifiedIcon />
              <span>{t('Verified Artist')}</span>
            </span>

            <span className='artistName'>
              <h1>{artist?.name}</h1>
            </span>
            <span className='listeners'>
              {artist?.followers.total} {t('followers')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
