import { FC, useRef } from 'react';

import { Col, Row } from 'antd';

import { SearchedSongs } from '../components/songs';
import { TopResult } from '../components/topResult';
import { SearchHeader } from '../../components/header';
import { AlbumsSearchSection } from '../components/albums';
import { ArtistsSearchSection } from '../components/artists';
import { PlaylistsSearchSection } from '../components/playlists';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../../../constants/spotify';

// Constants

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement>;
}

export const SearchPageContainer: FC<SearchPageProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <SearchHeader color={DEFAULT_PAGE_COLOR} sectionContainer={ref} container={props.container} />
      <div className='Search-Page'>
        <Row gutter={[16, 16]}>
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
      </div>
    </div>
  );
};

export default SearchPageContainer;
