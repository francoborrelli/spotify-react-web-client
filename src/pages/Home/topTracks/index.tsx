import { Col, Row } from 'antd';
import { HorizontalCard } from './horizontalCard';

// Redux
import { useAppSelector } from '../../../store/store';

// Interfaces
import type { FC } from 'react';

export const TopTracks: FC<{ setColor: (str: string) => void }> = (props) => {
  const topTracks = useAppSelector((state) => state.home.topTracks);

  if (!topTracks || !topTracks.length) return null;

  return (
    <Row gutter={[16, 16]} style={{ margin: '20px 0px' }} justify='space-between'>
      {topTracks.map((item) => {
        return (
          <Col key={item.name} xs={12} md={12} xl={6}>
            <HorizontalCard item={item} setColor={props.setColor} />
          </Col>
        );
      })}
    </Row>
  );
};
