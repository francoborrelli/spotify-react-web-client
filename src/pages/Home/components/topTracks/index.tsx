import { Col, Row } from 'antd';
import { HorizontalCard } from './horizontalCard';

// Redux
import { useAppSelector } from '../../../../store/store';

// Interfaces
import type { FC } from 'react';

const isMobile = window.innerWidth < 768;

export const TopTracks: FC<{ setColor: (str: string) => void }> = (props) => {
  const topTracks = useAppSelector((state) => state.home.topTracks);

  if (!topTracks || !topTracks.length) return null;

  return (
    <Row
      gutter={[16, 16]}
      style={{ margin: '20px 0px', marginTop: isMobile ? 20 : 70 }}
      justify='space-between'
    >
      {topTracks.slice(0, isMobile ? 4 : undefined).map((item) => {
        return (
          <Col key={item.name} xs={24} md={12} lg={6}>
            <HorizontalCard item={item} setColor={props.setColor} />
          </Col>
        );
      })}
    </Row>
  );
};
