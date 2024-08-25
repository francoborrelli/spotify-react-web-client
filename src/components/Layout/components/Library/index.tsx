import { Col, Row } from 'antd';

import YourLibrary from './YourLibrary';

// Redux
import { useAppDispatch } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

// Interfaces
import { useEffect, type FC } from 'react';
import type { Playlist } from '../../../../interfaces/types';

interface LibraryProps {
  playlists: Playlist[];
}

export const Library: FC<LibraryProps> = ({ playlists = [] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(yourLibraryActions.fetchMyAlbums());
    dispatch(yourLibraryActions.fetchMyArtists());
    dispatch(yourLibraryActions.fetchMyPlaylists());
  }, [dispatch]);

  return (
    <Row gutter={[8, 8]} style={{ height: '100%' }}>
      <Col span={24}>
        <YourLibrary />
      </Col>
    </Row>
  );
};

export default Library;