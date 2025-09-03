import { Col, Dropdown, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';
import { Tooltip } from '../../../components/Tooltip';
import { MenuDots, OrderCompactIcon, OrderListIcon } from '../../../components/Icons';
import { AddPlaylistToLibraryButton } from './AddPlaylistToLibrary';
import { PlayistActionsWrapper } from '../../../components/Actions/PlaylistActions';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { playlistActions, refreshPlaylist } from '../../../store/slices/playlist';

// Interfaces
import type { FC } from 'react';

const filters = ['LIST', 'COMPACT'] as const;

export const PlaylistControls: FC = () => {
  const dispatch = useAppDispatch();
  const [tor] = useTranslation(['order']);

  const user = useAppSelector((state) => state.auth.user);
  const view = useAppSelector((state) => state.playlist.view);
  const playlist = useAppSelector((state) => state.playlist.playlist);

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
              <div className='scale' style={{ marginRight: 10 }}>
                <AddPlaylistToLibraryButton id={playlist!.id} />
              </div>
            ) : null}

            <PlayistActionsWrapper
              playlist={playlist!}
              trigger={['click']}
              onRefresh={() => {
                dispatch(refreshPlaylist(playlist!.id));
              }}
            >
              <div>
                <Tooltip title={`${tor('More options for')} ${playlist?.name}`}>
                  <div className='scale'>
                    <MenuDots />
                  </div>
                </Tooltip>
              </div>
            </PlayistActionsWrapper>
          </Space>
        </Col>
        <Col>
          <Space className='mobile-hidden'>
            <Tooltip title={tor('VIEW')}>
              <Dropdown placement='bottomRight' menu={{ items, selectedKeys: [view] }}>
                <button className='order-button'>
                  <Space align='center'>
                    <span>{tor(view)}</span>
                    {view === 'LIST' ? <OrderListIcon /> : <OrderCompactIcon />}
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
