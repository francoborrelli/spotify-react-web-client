import { memo } from 'react';

// Components
import { Col, Row } from 'antd';
import { NowPlayingLayout } from '../layout';
import { useTranslation } from 'react-i18next';
import { CurrentDevice } from './currentDevice';
import { DevicesList } from './list/deviceList';

export const Devices = memo(() => {
  const [t] = useTranslation(['playingBar']);

  return (
    <NowPlayingLayout title={t('Connect to a device')}>
      <div style={{ margin: '20px 10px' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <CurrentDevice />
          </Col>

          <Col span={24}>
            <DevicesList />
          </Col>
        </Row>
      </div>
    </NowPlayingLayout>
  );
});
