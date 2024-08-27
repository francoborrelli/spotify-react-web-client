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

const filters = ['LIST', 'COMPACT'] as const;

export const PlaylistControls: FC = () => {
  const dispatch = useAppDispatch();
  const [tor] = useTranslation(['order']);
  const view = useAppSelector((state) => state.playlist.view);

  const items = filters.map((filter) => ({
    key: filter,
    label: tor(filter),
    onClick: () => dispatch(playlistActions.setView({ view: filter })),
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
            <Tooltip title={tor('VIEW')}>
              <Dropdown placement='bottomRight' menu={{ items, selectedKeys: [view] }}>
                <button className='order-button'>
                  <Space align='center'>
                    <span>{tor(view)}</span>
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
