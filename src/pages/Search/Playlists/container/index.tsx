import { FC } from 'react';

import { Col, Row } from 'antd';

import { PlaylistsSearchSection } from '../components/playlists';

interface SearchPlaylistPageContainerProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchPlaylistPageContainer: FC<SearchPlaylistPageContainerProps> = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PlaylistsSearchSection />
      </Col>
    </Row>
  );
};

export default SearchPlaylistPageContainer;
