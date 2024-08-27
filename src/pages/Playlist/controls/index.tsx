import { Col, Dropdown, Row, Space } from 'antd';

import { Tooltip } from '../../../components/Tooltip';
import { MenuDots, OrderListIcon } from '../../../components/Icons';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { playlistActions } from '../../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../../store/store';

// Interfaces
import type { FC } from 'react';
import { PlayCircleButton } from './playCircle';
import { PlayistActionsWrapper } from '../../../components/Actions/PlaylistActions';
import { AddPlaylistToLibraryButton } from './AddPlaylistToLibrary';

const filters = ['LIST', 'COMPACT'] as const;

export const PlaylistControls: FC = () => {
  const dispatch = useAppDispatch();
  const [tor] = useTranslation(['order']);
  const view = useAppSelector((state) => state.playlist.view);
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const user = useAppSelector((state) => state.auth.user);

  const isMine = playlist?.owner?.id === user?.id;

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

            {!isMine ? (
              <div style={{ marginRight: 10 }}>
                <AddPlaylistToLibraryButton id={playlist!.id} />
              </div>
            ) : null}

            <PlayistActionsWrapper playlist={playlist!} trigger={['click']}>
              <Tooltip title={`More options for ${playlist?.name}`}>
                <div>
                  <MenuDots />
                </div>
              </Tooltip>
            </PlayistActionsWrapper>
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
