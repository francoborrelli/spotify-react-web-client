// Components
import { Col, Row } from 'antd';
import { HomeHeader } from './header';
import { TopTracks } from './topTracks';
import { NewReleases } from './newReleases';

// Utils
import { FC, RefObject, useEffect, useRef, useState } from 'react';

// Interfaces
import { useAppDispatch } from '../../store/store';
import { homeActions } from '../../store/slices/home';
import { FeaturePlaylists } from './featurePlaylists';

interface HomeProps {
  container: RefObject<HTMLDivElement>;
}

const Home: FC<HomeProps> = (props) => {
  const { container } = props;
  const [color, setColor] = useState('rgb(66, 32, 35)');

  const dispatch = useAppDispatch();
  const sectionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(homeActions.fetchTopTracks());
    dispatch(homeActions.fetchNewReleases());
    dispatch(homeActions.fecthFeaturedPlaylists());
  }, [dispatch]);

  return (
    <div ref={sectionContainerRef}>
      <HomeHeader color={color} container={container} sectionContainer={sectionContainerRef} />
      <div
        className='Home-seccion'
        style={{
          paddingTop: 50,
          transition: 'background: 5s',
          background: `linear-gradient(180deg, ${color} -20%, rgb(18, 18, 18) 50%)`,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <TopTracks setColor={setColor} />
          </Col>

          <Col span={24}>
            <NewReleases />
          </Col>

          <Col span={24}>
            <FeaturePlaylists />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
