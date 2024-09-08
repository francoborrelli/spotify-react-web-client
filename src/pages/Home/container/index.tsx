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

interface HomePageContainerProps {
  container: RefObject<HTMLDivElement>;
}

const HomePageContainer: FC<HomePageContainerProps> = memo((props) => {
  const { container } = props;
  const [color, setColor] = useState('rgb(66, 32, 35)');

  const user = useAppSelector((state) => state.auth.user);
  const sectionContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionContainerRef}>
      <HomeHeader color={color} container={container} sectionContainer={sectionContainerRef} />
      <div
        className='Home-seccion'
        style={{
          paddingTop: user ? 50 : 0,
          marginTop: user ? 0 : -40,
          transition: 'background: 5s',
          background: `linear-gradient(180deg, ${color} 2%, rgb(18, 18, 18) 18%)`,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TopTracks setColor={setColor} />
          </Col>

          <Col span={24}>
            <MadeForYou />
          </Col>

          <Col span={24}>
            <TopMixes />
          </Col>

          <Col span={24}>
            <RecentlyPlayed />
          </Col>

          <Col span={24}>
            <FeaturePlaylists />
          </Col>

          <Col span={24}>
            <NewReleases />
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default HomePageContainer;
