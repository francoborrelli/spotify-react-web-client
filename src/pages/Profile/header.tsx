import { Col, Row, Space } from 'antd';

// I18n
import { useTranslation } from 'react-i18next';
import { VerifiedIcon } from '../../components/Icons';

export const ProfileHeader = () => {
  const { t } = useTranslation(['profile']);

  return (
    <div className='profile-header'>
      <div style={{ padding: 40, paddingTop: 20 }}>
        <Row gutter={[24, 24]} align={'middle'}>
          <Col xs={24} sm={6} lg={5}>
            <img
              alt='franco profile pic'
              src={`${process.env.PUBLIC_URL}/images/profile.jpeg`}
              className='profile-img'
            />
          </Col>
          <Col xs={24} sm={18} lg={19}>
            <Row justify='space-between'>
              <Col span={24}>
                <Space>
                  <VerifiedIcon />
                  <p className='text-white'>{t('Verified')}</p>
                </Space>
                <h1 className='profile-title'>Franco Borrelli</h1>
              </Col>
              <Col span={24}>
                <Space className='owner'>
                  <h3 className='text-sm font-semibold text-white'>
                    <span className='songs-number'>{t('Experience years')}</span> <span>•</span>{' '}
                    <span className='songs-number'>{t('Minutes on spotify')}</span>
                  </h3>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
