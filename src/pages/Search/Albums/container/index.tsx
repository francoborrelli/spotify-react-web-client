import { FC } from 'react';

import { Col, Row } from 'antd';

import { AlbumsSearchSection } from '../components/albums';

interface SearchAlbumsPageContainerProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchAlbumsPageContainer: FC<SearchAlbumsPageContainerProps> = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <AlbumsSearchSection />
      </Col>
    </Row>
  );
};

export default SearchAlbumsPageContainer;
