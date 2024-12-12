import { FC } from 'react';

import { Col, Row } from 'antd';

import { SearchedSongs } from '../components/songs';
import { TopResult } from '../components/topResult';
import { AlbumsSearchSection } from '../components/albums';
import { ArtistsSearchSection } from '../components/artists';
import { PlaylistsSearchSection } from '../components/playlists';

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchPageContainer: FC<SearchPageProps> = (props) => {
  return (
    <Row gutter={[16, 16]} style={{ paddingBottom: 20 }}>
      <Col span={24} lg={9}>
        <TopResult />
      </Col>

      <Col span={24} lg={15}>
        <SearchedSongs />
      </Col>

      <Col span={24}>
        <ArtistsSearchSection />
      </Col>

      <Col span={24}>
        <AlbumsSearchSection />
      </Col>

      <Col span={24}>
        <PlaylistsSearchSection />
      </Col>
    </Row>
  );
};

export default SearchPageContainer;
