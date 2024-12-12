import { FC } from 'react';

import { Col, Row } from 'antd';

import { ArtistsSearchSection } from '../components/artists';

interface SearchArtistsPageContainerProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchArtistsPageContainer: FC<SearchArtistsPageContainerProps> = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <ArtistsSearchSection />
      </Col>
    </Row>
  );
};

export default SearchArtistsPageContainer;
