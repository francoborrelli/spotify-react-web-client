import { Col, Dropdown, Row, Space } from 'antd';

import { Tooltip } from '../../components/Tooltip';
import { MenuDots, OrderListIcon } from '../../components/Icons';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { playlistActions } from '../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../store/store';

// Interfaces
import type { FC } from 'react';
import { PlayCircleButton } from './playCircle';

export const PlaylistControls: FC = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.playlist.order);
  const playlist = useAppSelector((state) => state.playlist.playlist);

  const [tor] = useTranslation(['order']);
  const [t] = useTranslation(['playlist']);

  const filters = ['List', 'Compact'];

  const items = filters.map((filter) => ({
    key: filter,
    onClick: () => dispatch(playlistActions.setOrder({ order: filter })),
  }));

  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space>
            <PlayCircleButton />
            <MenuDots />
          </Space>
        </Col>
        <Col>
          <Space>
            <Tooltip title={t('Filter')}>
              <Dropdown placement='bottomRight' menu={{ items, selectedKeys: [order] }}>
                <button className='order-button'>
                  <Space align='center'>
                    <span style={{ color: order !== 'ALL' ? 'inherit' : 'transparent' }}>
                      {tor(order)}
                    </span>
                    <OrderListIcon />
                  </Space>
                </button>
              </Dropdown>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </div>
  );
};
