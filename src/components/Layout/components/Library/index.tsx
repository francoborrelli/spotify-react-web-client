import { Col, Row } from 'antd';

import YourLibrary from './YourLibrary';

// Interfaces
import type { FC } from 'react';
import type { Playlist } from '../../../../interfaces/types';

interface LibraryProps {
  playlists: Playlist[];
}

export const Library: FC<LibraryProps> = ({ playlists = [] }) => {
  return (
    <Row gutter={[8, 8]} style={{ height: '100%' }}>
      <Col span={24}>
        <YourLibrary playlists={playlists} />
      </Col>
    </Row>
  );
};

export default Library;
