// Components
import { Col, Row } from 'antd';
import { HomeHeader } from './header';
import { TopTracks } from '../components/topTracks';
import { MadeForYou } from '../components/madeForYou';
import { NewReleases } from '../components/newReleases';
import { FeaturePlaylists } from '../components/featurePlaylists';

// Utils
import { FC, memo, RefObject, useRef, useState } from 'react';
import { RecentlyPlayed } from '../components/recentlyPlayed';
import { TopMixes } from '../components/topMixes';
import { useAppSelector } from '../../../store/store';
import { Rankings } from '../components/rankings';
import { Trending } from '../components/trending';
import { FavouriteArtists } from '../components/favouriteArtists';
import { YourPlaylists } from '../components/yourPlaylists';
import { Podcasts } from '../components/podcasts';
import useIsMobile from '../../../utils/isMobile';

interface HomePageContainerProps {
  container: RefObject<HTMLDivElement | null>;
}

const HomePageContainer: FC<HomePageContainerProps> = memo((props) => {
  const { container } = props;
  const [color, setColor] = useState('rgb(66, 32, 35)');

  const isMobile = useIsMobile();
  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => !!state.auth.user);
  const section = useAppSelector((state) => state.home.section);

  return (
    <div ref={sectionContainerRef}>
      <HomeHeader color={color} container={container} sectionContainer={sectionContainerRef} />
      <div
        className={`Home-seccion${section === 'PODCAST' ? ' Home-seccion--podcasts' : ''}`}
        style={{
          paddingTop: isMobile ? 50 : 0,
          transition: 'background: 5s',
          background: `linear-gradient(180deg, ${color} 2%, rgb(18, 18, 18) 18%)`,
        }}
      >
        <Row gutter={user ? [16, 16] : undefined}>
          {user && section === 'PODCAST' ? (
            <Col span={24}>
              <Podcasts />
            </Col>
          ) : null}

          {user && section !== 'PODCAST' ? (
            <Col span={24}>
              <TopTracks setColor={setColor} />
            </Col>
          ) : null}

          {user && section !== 'PODCAST' ? (
            <Col span={24}>
              <MadeForYou />
            </Col>
          ) : null}

          {user && section !== 'PODCAST' ? (
            <Col span={24}>
              <TopMixes />
            </Col>
          ) : null}

          {user && section === 'ALL' ? (
            <Col span={24}>
              <RecentlyPlayed />
            </Col>
          ) : null}

          {section !== 'PODCAST' ? (
            <Col span={24}>
              <FeaturePlaylists />
            </Col>
          ) : null}

          {user && section !== 'PODCAST' ? (
            <Col span={24}>
              <YourPlaylists />
            </Col>
          ) : null}

          {section !== 'PODCAST' ? (
            <Col span={24}>
              <NewReleases />
            </Col>
          ) : null}

          {!user || section === 'MUSIC' ? (
            <Col span={24}>
              <Rankings />
            </Col>
          ) : null}

          {!user || section === 'MUSIC' ? (
            <Col span={24}>
              <Trending />
            </Col>
          ) : null}

          {user && section === 'ALL' ? (
            <Col span={24}>
              <FavouriteArtists />
            </Col>
          ) : null}
        </Row>
      </div>
    </div>
  );
});

export default HomePageContainer;
