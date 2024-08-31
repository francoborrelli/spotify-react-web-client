import { Col, Row } from 'antd';
import { memo } from 'react';

import { BrowseCard } from '../components/card';
import { useAppSelector } from '../../../store/store';
import { RecentSearchesActions } from '../components/recent-search';
import { useTranslation } from 'react-i18next';

export const BrowsePageContainer = memo(() => {
  const [t] = useTranslation(['search']);
  const categories = useAppSelector((state) => state.browse.categories);

  if (!categories) return null;

  return (
    <div className='browse-page' style={{ margin: 20, marginTop: 30 }}>
      <div>
        <RecentSearchesActions />

        <h1 className='playlist-header'>{t('Browse all')}</h1>

        <Row gutter={[16, 16]} style={{ marginLeft: 5, marginRight: 5 }}>
          {categories.map((category) => (
            <Col key={category.id} span={24} xs={12} sm={12} md={8} lg={6}>
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
