import { Col, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';

// Interfaces
import type { FC } from 'react';

export const PlaylistControls: FC = () => {
  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space align='center'>
            <PlayCircleButton />
          </Space>
        </Col>
      </Row>
    </div>
  );
};
