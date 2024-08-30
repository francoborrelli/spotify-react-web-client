import { Col, Row } from 'antd';
import { memo } from 'react';

import { BrowseCard } from '../components/card';
import { useAppSelector } from '../../../store/store';

export const BrowsePageContainer = memo(() => {
  const categories = useAppSelector((state) => state.browse.categories);

  if (!categories) return null;

  return (
    <div style={{ margin: 20, marginTop: 30 }}>
      <div>
        <h1 className='playlist-header'>Browse all</h1>

        <Row gutter={[16, 16]} style={{ marginLeft: 5, marginRight: 5 }}>
          {categories.map((category) => (
            <Col key={category.id} span={24} sm={12} md={8} lg={6}>
              <BrowseCard category={category} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
});

BrowsePageContainer.displayName = 'BrowsePageContainer';

export default BrowsePageContainer;
