import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Col, Row } from 'antd';
import { fetchCategories } from '../../store/slices/browse';
import { BrowseCard } from './card';

export const BrowsePage = memo(() => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.browse.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

BrowsePage.displayName = 'BrowsePage';

export default BrowsePage;
