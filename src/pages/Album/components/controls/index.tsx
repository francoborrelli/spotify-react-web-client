import { Col, Dropdown, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';
import { Tooltip } from '../../../../components/Tooltip';
import { AddAlbumToLibraryButton } from './AddAlbumToLibrary';
import { MenuDots, OrderListIcon } from '../../../../components/Icons';
import { AlbumActionsWrapper } from '../../../../components/Actions/AlbumActions';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { albumActions } from '../../../../store/slices/album';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

// Interfaces
import { memo, type FC } from 'react';

const filters = ['LIST', 'COMPACT'] as const;

const ViewSection = memo(() => {
  const dispatch = useAppDispatch();
  const [tor] = useTranslation(['order']);

  const view = useAppSelector((state) => state.album.view);

  const items = filters.map((filter) => ({
    key: filter,
    label: tor(filter),
    onClick: () => dispatch(albumActions.setView({ view: filter })),
  }));

  return (
    <Space className='mobile-hidden'>
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
  );
});

const MenuSection = memo(() => {
  const [tor] = useTranslation(['order']);

  const album = useAppSelector((state) => state.album.album);

  return (
    <AlbumActionsWrapper album={album!} trigger={['click']}>
      <div>
        <Tooltip title={`${tor('More options for')} ${album?.name}`}>
          <div className='scale'>
            <MenuDots />
          </div>
        </Tooltip>
      </div>
    </AlbumActionsWrapper>
  );
});

export const AlbumControls: FC = () => {
  const album = useAppSelector((state) => state.album.album);

  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space align='center'>
            <PlayCircleButton />

            <div className='scale' style={{ marginRight: 10 }}>
              <AddAlbumToLibraryButton id={album!.id} />
            </div>

            <MenuSection />
          </Space>
        </Col>

        <Col>
          <ViewSection />
        </Col>
      </Row>
    </div>
  );
};
