import { Col, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { PlaylistTableHeader } from './table/header';
import { PlayCircleButton } from './controls/playCircle';

// I18n
import { useTranslation } from 'react-i18next';

// Interfaces
import type { Track } from '../../interfaces/track';
import { RefObject, useEffect, useState, type FC } from 'react';

// Redux
import { useAppSelector } from '../../store/store';

// Utils
import dayjs from 'dayjs';
import tinycolor from 'tinycolor2';

interface AlbumHeaderProps {
  color: string;
  container: RefObject<HTMLDivElement>;
}

// function that sums tracks length and return duration in minutes and seconds
export const sumTracksLength = (tracks: Track[]): string => {
  const totalDuration = tracks.reduce((acc, track) => acc + track.duration_ms, 0);
  const minutes = Math.floor(totalDuration / 60000);
  const seconds = Math.floor((totalDuration % 60000) / 1000);
  return `${minutes} min ${seconds} sec`;
};

export const AlbumHeader: FC<AlbumHeaderProps> = ({ container, color }) => {
  const { t } = useTranslation(['album']);

  const album = useAppSelector((state) => state.album.album);
  const artist = useAppSelector((state) => state.album.artist);

  const [headerWidth, setHeaderWidth] = useState(0);
  const [activeTable, setActiveTable] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);

  const queueCollapsed = useAppSelector((state) => state.ui.queueCollapsed);
  const detailsCollaped = useAppSelector((state) => state.ui.detailsCollapsed);
  const libraryCollapsed = useAppSelector((state) => state.ui.libraryCollapsed);

  const tracks = useAppSelector((state) => state.album.tracks);

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
          <h1 className='nav-header-playlist-title'>{album?.name}</h1>
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
              <img src={album?.images[0].url} alt='' className='playlist-img' />
            </div>
          </Col>
          <Col xs={24} sm={18} lg={19}>
            <Row justify='space-between'>
              <Col span={24}>
                <p className='text-white'>{t('Album')}</p>
                <h1 className='playlist-title'>{album?.name}</h1>
              </Col>
              <Col span={24}>
                <Space className='owner'>
                  {artist ? (
                    <Link to='/profile'>
                      <img
                        id='user-avatar'
                        alt='User Avatar'
                        src={artist.images[0].url}
                        className='playlist-avatar'
                      />
                    </Link>
                  ) : null}

                  <h3 className='text-sm font-semibold text-white'>
                    {artist ? (
                      <Link to='/' className='link-text'>
                        {artist?.name}
                      </Link>
                    ) : (
                      ''
                    )}{' '}
                    <span className='songs-number'>
                      {' '}
                      • {dayjs(album?.release_date!).format('YYYY')} • {album?.total_tracks}{' '}
                      {t('songs')},{'  '}
                      {sumTracksLength(tracks)}
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
