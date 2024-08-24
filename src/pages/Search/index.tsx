import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';
import { TopResult } from './topResult';
import { SearchedSongs } from './songs';
import NoSearchResults from './noResults';
import { PlaylistsSection } from '../Home/playlists';

// Constants
import { playlists } from '../../constants/cv';

const data = playlists
  .map((playlist) => playlist.songs.map((s) => ({ ...s, playlist: playlist.name })))
  .flat();

export type SearchResult = (typeof data)[number];

const searchableKeys: (keyof SearchResult)[] = ['name', 'artist', 'playlist', 'description'];

export const SearchPage = () => {
  const { t } = useTranslation(['cv']);
  const { t: searchT } = useTranslation(['search']);

  const params = useParams<{ search: string }>();
  const [items, searchItems] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (params.search) {
      const search = params.search.toLowerCase();
      const results = data.filter((item) =>
        searchableKeys.some(
          (key) =>
            t(item[key] || '')
              .toLowerCase()
              .includes(search) ||
            item.skills.some((skill) => skill.text.toLowerCase().includes(search))
        )
      );

      searchItems(results);
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

        <Col span={24}>
          <PlaylistsSection title={searchT('Playlists')} />
        </Col>
      </Row>
    </div>
  );
};
