// Components
import { Col, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { PlaylistTableHeader } from './table/header';
import { PlayCircleButton } from './controls/playCircle';

// I18n
import { useTranslation } from 'react-i18next';

// Interfaces
import { RefObject, useEffect, useState, type FC } from 'react';

// Constants
import { LIKED_SONGS_IMAGE } from '../../constants/spotify';

// Utils
import tinycolor from 'tinycolor2';

// Redux
import { useAppSelector } from '../../store/store';
import { isRightLayoutOpen } from '../../store/slices/ui';

interface LikedSongsHeaderProps {
  color: string;
  container: RefObject<HTMLDivElement | null>;
  sectionContainer: RefObject<HTMLDivElement | null>;
}

export const LikedSongsHeader: FC<LikedSongsHeaderProps> = ({
  container,
  color,
  sectionContainer,
}) => {
  const { t } = useTranslation(['playlist']);

  const user = useAppSelector((state) => state.auth.user);
  const total = useAppSelector((state) => state.likedSongs.total);

  const [headerWidth, setHeaderWidth] = useState(0);
  const [activeHeader, setActiveHeader] = useState(false);
  const [activeTable, setActiveTable] = useState(false);

  const rightLayoutOpen = useAppSelector(isRightLayoutOpen);
  const libraryCollapsed = useAppSelector((state) => state.ui.libraryCollapsed);

  useEffect(() => {
    const ref = container.current;
    const handleScroll = () => {
      if (ref) {
        setActiveHeader(ref.scrollTop > 260);
        setActiveTable(ref.scrollTop > 320);
      }
    };
    ref?.addEventListener('scroll', handleScroll);
    return () => {
      window.onresize = null;
      ref?.removeEventListener('scroll', handleScroll);
    };
  }, [container]);

  useEffect(() => {
    const ref = sectionContainer?.current;
    if (ref) {
      const observer = new ResizeObserver((entries) => {
        setHeaderWidth(entries[0].contentRect.width);
      });
      observer.observe(ref);
      return () => ref && observer.unobserve(ref);
    }
  }, [sectionContainer, rightLayoutOpen, libraryCollapsed]);

  return (
    <div
      style={{
        overflow: 'auto',
        position: 'relative',
        background: `linear-gradient(180deg, transparent 0px, ${color} 100%), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=")`,
      }}
    >
      <div
        className={`nav-header ${activeHeader ? 'active' : ''}`}
        style={{
          width: headerWidth,
          opacity: !activeHeader ? 0 : 1,
          backgroundColor: !activeHeader
            ? 'transparent'
            : tinycolor(color).darken(10).toRgbString(),
        }}
      >
        <Space>
          <PlayCircleButton size={20} />
          <h1 className='nav-header-playlist-title'>{t('Liked Songs')}</h1>
        </Space>
        <div
          style={{ padding: '0px 20px', opacity: !activeTable ? 0 : 1 }}
          className={`nav-bar-header-table-container ${activeTable ? 'active' : ''}`}
        >
          <PlaylistTableHeader />
        </div>
      </div>

      <div style={{ padding: 30, paddingTop: 30 }}>
        <Row gutter={[24, 24]} align={'middle'}>
          <Col xs={24} sm={6} lg={5}>
            <div>
              <img src={LIKED_SONGS_IMAGE} alt='liked songs images' className='playlist-img' />
            </div>
          </Col>

          <Col xs={24} sm={18} lg={19}>
            <Row justify='space-between'>
              <Col span={24}>
                <p className='text-white'>{t('Playlist')}</p>
                <div>
                  <h1 className='playlist-title'>{t('Liked Songs')}</h1>
                </div>
              </Col>

              <Col span={24}>
                <Space className='owner'>
                  {user?.images?.[0]?.url ? (
                    <Link to='/profile'>
                      <img
                        id='user-avatar'
                        alt='User Avatar'
                        src={user?.images?.[0]?.url}
                        className='playlist-avatar'
                      />
                    </Link>
                  ) : null}

                  <h3 className='text-sm font-semibold text-white'>
                    <Link to='/' className='link-text'>
                      {user?.display_name}
                    </Link>

                    <span className='songs-number'>
                      {total ? ` • ${total} ${t(total === 1 ? 'song' : 'songs')}` : ' '}
                    </span>
                  </h3>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
