import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';
import { TopResult } from './topResult';
import { SearchedSongs } from './songs';
import NoSearchResults from './noResults';

// Constants

export const SearchPage = () => {
  const { t } = useTranslation(['cv']);

  const params = useParams<{ search: string }>();
  const [items, searchItems] = useState<any[]>([]);

  useEffect(() => {
    if (params.search) {
      searchItems([]);
    }
  }, [params.search, t]);

  if (!items.length) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return (
    <div className='Search-Page'>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={9}>
          <TopResult item={items[0]} />
        </Col>

        <Col span={24} lg={15}>
          <SearchedSongs songs={items.slice(0, 4)} />
        </Col>

        <Col span={24}>{/* <PlaylistsSection title={searchT('Playlists')} /> */}</Col>
      </Row>
    </div>
  );
};
