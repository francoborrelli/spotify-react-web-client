import { FC } from 'react';

import { Col, Row } from 'antd';

import { SongsProfileSection } from '../components/songs';

interface ProfileSongsPageContainerProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const ProfileSongsPageContainer: FC<ProfileSongsPageContainerProps> = (props) => {
  return (
    <Row gutter={[16, 16]} style={{ margin: 20, marginTop: 30 }}>
      <Col span={24}>
        <SongsProfileSection {...props} />
      </Col>
    </Row>
  );
};

export default ProfileSongsPageContainer;
