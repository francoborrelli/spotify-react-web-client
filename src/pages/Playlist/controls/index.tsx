import { Col, Dropdown, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';
import { Tooltip } from '../../../components/Tooltip';
import {
  CloseIcon2,
  MenuDots,
  OrderCompactIcon,
  OrderListIcon,
  SearchIcon,
} from '../../../components/Icons';
import { AddPlaylistToLibraryButton } from './AddPlaylistToLibrary';
import { PlayistActionsWrapper } from '../../../components/Actions/PlaylistActions';

// Utils
import { useTranslation } from 'react-i18next';
import { memo, useEffect, useRef, useState, type FC } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { playlistActions, refreshPlaylist } from '../../../store/slices/playlist';

const filters = ['LIST', 'COMPACT'] as const;

const PlaylistSearch = memo(() => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [tor] = useTranslation(['order']);
  const search = useAppSelector((state) => state.playlist.search);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      if (search.trim()) return;
      setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, search]);

  const handleClose = () => {
    dispatch(playlistActions.setSearch({ search: '' }));
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`playlist-search ${open ? 'open' : ''}`}>
      <div className='playlist-search__field'>
        <input
          ref={inputRef}
          value={search}
          placeholder={tor('Search in playlist')}
          onChange={(e) => dispatch(playlistActions.setSearch({ search: e.target.value }))}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              if (search.trim()) {
                dispatch(playlistActions.setSearch({ search: '' }));
              } else {
                setOpen(false);
              }
            }
          }}
        />
        <button
          type='button'
          className='playlist-search__close'
          aria-label='Close'
          onClick={handleClose}
        >
          <CloseIcon2 />
        </button>
      </div>

      <button
        type='button'
        className='playlist-search__toggle'
        aria-label={tor('Search in playlist')}
        onClick={() => {
          if (!open) setOpen(true);
          else inputRef.current?.focus();
        }}
      >
        <SearchIcon style={{ height: '1rem' }} />
      </button>
    </div>
  );
});

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
          <Space className='mobile-hidden' align='center' size={12}>
            <PlaylistSearch />
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
