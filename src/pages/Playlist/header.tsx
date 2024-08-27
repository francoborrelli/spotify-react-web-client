import { Col, Row, Space } from 'antd';

// I18n
import { useTranslation } from 'react-i18next';

// Interfaces
import { RefObject, useEffect, useState, type FC } from 'react';
import { Link } from 'react-router-dom';

// Utils
import tinycolor from 'tinycolor2';
import { useAppSelector } from '../../store/store';
import { PlayCircleButton } from './playCircle';
import { PlaylistTableHeader } from './table/header';

interface PlaylistHeaderProps {
  color: string;
  container: RefObject<HTMLDivElement>;
}

export const PlaylistHeader: FC<PlaylistHeaderProps> = ({ container, color }) => {
  const { t } = useTranslation(['playlist']);

  const playlist = useAppSelector((state) => state.playlist.playlist);
  const owner = useAppSelector((state) => state.playlist.user);

  const [headerWidth, setHeaderWidth] = useState(0);
  const [activeHeader, setActiveHeader] = useState(false);
  const [activeTable, setActiveTable] = useState(false);

  const queueCollapsed = useAppSelector((state) => state.ui.queueCollapsed);
  const detailsCollaped = useAppSelector((state) => state.ui.detailsCollapsed);
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

    setHeaderWidth(container.current?.clientWidth || 0);
    window.onresize = () => {
      if (container.current) {
        setHeaderWidth(container.current.clientWidth);
      }
    };
    return () => {
      window.onresize = null;
      ref?.removeEventListener('scroll', handleScroll);
    };
  }, [container, queueCollapsed, detailsCollaped, libraryCollapsed]);

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
          <h1 className='nav-header-playlist-title'>{playlist?.name}</h1>
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
            <img src={playlist?.images[0].url} alt='' className='playlist-img' />
          </Col>
          <Col xs={24} sm={18} lg={19}>
            <Row justify='space-between'>
              <Col span={24}>
                <p className='text-white'>{t('Playlist')}</p>
                <h1 className='playlist-title'>{playlist?.name}</h1>
                <p className='playlist-description'>{playlist?.description}</p>
              </Col>
              <Col span={24}>
                <Space className='owner'>
                  {owner?.images?.length ? (
                    <Link to='/profile'>
                      <img
                        className='playlist-avatar'
                        id='user-avatar'
                        alt='User Avatar'
                        src={owner?.images[0].url}
                      />{' '}
                    </Link>
                  ) : null}

                  <h3 className='text-sm font-semibold text-white'>
                    {owner ? (
                      owner?.display_name === 'Spotify' ? (
                        <span className='link-text'>{owner?.display_name}</span>
                      ) : (
                        <Link to='/' className='link-text'>
                          {owner?.display_name}
                        </Link>
                      )
                    ) : (
                      ''
                    )}{' '}
                    <span className='songs-number'>
                      {playlist?.followers?.total ? ` • ${playlist?.followers?.total} saves` : ' '}{' '}
                      • {playlist?.tracks?.total} {t('songs')}
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
