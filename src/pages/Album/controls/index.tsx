import { Col, Dropdown, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';
import { Tooltip } from '../../../components/Tooltip';
import { MenuDots, OrderListIcon } from '../../../components/Icons';
import { AddAlbumToLibraryButton } from './AddAlbumToLibrary';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { playlistActions } from '../../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../../store/store';

// Interfaces
import type { FC } from 'react';
import { AlbumActionsWrapper } from '../../../components/Actions/AlbumActions';

const filters = ['LIST', 'COMPACT'] as const;

export const AlbumControls: FC = () => {
  const dispatch = useAppDispatch();
  const [tor] = useTranslation(['order']);

  const album = useAppSelector((state) => state.album.album);
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
          <Space align='center'>
            <PlayCircleButton />

            <div className='scale' style={{ marginRight: 10 }}>
              <AddAlbumToLibraryButton id={album!.id} />
            </div>

            <AlbumActionsWrapper
              album={album!}
              trigger={['click']}
              onRefresh={() => {
                // dispatch(refreshPlaylist(playlist!.id));
              }}
            >
              <Tooltip title={`More options for ${album?.name}`}>
                <div className='scale'>
                  <MenuDots />
                </div>
              </Tooltip>
            </AlbumActionsWrapper>
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
