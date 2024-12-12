import { FC } from 'react';

import { Col, Row } from 'antd';

import { ArtistsProfileSection } from '../components/artists';

interface ProfileArtistsPageContainerProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const ProfileArtistsPageContainer: FC<ProfileArtistsPageContainerProps> = (props) => {
  return (
    <Row gutter={[16, 16]} style={{ margin: 20, marginTop: 30 }}>
      <Col span={24}>
        <ArtistsProfileSection />
      </Col>
    </Row>
  );
};

export default ProfileArtistsPageContainer;
