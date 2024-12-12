import { FC } from 'react';

import { Col, Row } from 'antd';

import { SongsSearchSection } from '../components/songs';

interface SearchSongsPageContainerProps {
  query: string;
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchSongsPageContainer: FC<SearchSongsPageContainerProps> = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SongsSearchSection query={props.query} />
      </Col>
    </Row>
  );
};

export default SearchSongsPageContainerProps;
