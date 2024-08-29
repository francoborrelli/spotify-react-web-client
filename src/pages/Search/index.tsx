import { FC, useEffect, useRef } from 'react';

import { Col, Row } from 'antd';
import { SearchedSongs } from './songs';
import { TopResult } from './topResult';
import NoSearchResults from './noResults';
import { AlbumsSearchSection } from './albums';
import { ArtistsSearchSection } from './artists';
import { PlaylistsSearchSection } from './playlists';

// Utils
import { useParams } from 'react-router-dom';

// Redux
import { fetchSearch } from '../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { SearchHeader } from './header';

// Constants

const Container = () => {
  return (
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
  );
};

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement>;
}

export const SearchPage: FC<SearchPageProps> = (props) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ search: string }>();

  const ref = useRef<HTMLDivElement>(null);

  const topResult = useAppSelector((state) => state.search.top);
  const loading = useAppSelector((state) => state.search.loading);

  useEffect(() => {
    if (params.search) {
      dispatch(fetchSearch(params.search));
    }
  }, [dispatch, params.search]);

  if (loading) return null;

  if (!topResult) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return (
    <div ref={ref}>
      <SearchHeader color='#121212' sectionContainer={ref} container={props.container} />
      <div className='Search-Page'>
        <Container />
      </div>
    </div>
  );
};
