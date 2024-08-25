// Components
import { Col, Row } from 'antd';
import { TopTracks } from './topTracks';
import { NewReleases } from './newReleases';

// Utils
import { FC, useEffect, useState } from 'react';

// Interfaces
import { useAppDispatch } from '../../store/store';
import { homeActions } from '../../store/slices/home';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [color, setColor] = useState('rgb(66, 32, 35)');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(homeActions.fetchTopTracks());
    dispatch(homeActions.fetchNewReleases());
  }, [color]);

  return (
    <div
      className='Home-seccion'
      style={{
        transition: 'background: 0.5s',
        background: `linear-gradient(180deg, ${color} -20%, rgb(18, 18, 18) 50%)`,
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <TopTracks />
        </Col>

        <Col span={24}>
          <NewReleases />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
