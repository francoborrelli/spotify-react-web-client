import { FC } from 'react';

import { Col, Row } from 'antd';

import { PlaylistsProfileSection } from '../components/playlists';

interface ProfilePlaylistsPageContainerProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const ProfilePlaylistsPageContainer: FC<ProfilePlaylistsPageContainerProps> = (props) => {
  return (
    <Row gutter={[16, 16]} style={{ margin: 20, marginTop: 30 }}>
      <Col span={24}>
        <PlaylistsProfileSection />
      </Col>
    </Row>
  );
};

export default ProfilePlaylistsPageContainer;
