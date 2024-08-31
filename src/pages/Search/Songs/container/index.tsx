import { FC } from 'react';

import { Col, Row } from 'antd';

import { SongsSearchSection } from '../components/songs';

interface SearchSongsPageContainerProps {
  container: React.RefObject<HTMLDivElement>;
}

export const SearchSongsPageContainer: FC<SearchSongsPageContainerProps> = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SongsSearchSection />
      </Col>
    </Row>
  );
};

export default SearchSongsPageContainerProps;
