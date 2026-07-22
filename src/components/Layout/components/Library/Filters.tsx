import { memo, useEffect, useMemo, useRef, useState } from 'react';

import Chip from '../../../Chip';
import { Dropdown, Flex, Space } from 'antd';
import { CloseIcon2, GridIcon, OrderCompactIcon, OrderListIcon, SearchIcon } from '../../../Icons';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions, YourLibraryState } from '../../../../store/slices/yourLibrary';

const VIEW = ['COMPACT', 'LIST', 'GRID'] as const;

const SearchSelector = memo(({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [t] = useTranslation('navbar');
  const search = useAppSelector((state) => state.yourLibrary.search);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleClose = () => {
    dispatch(yourLibraryActions.setSearch({ search: '' }));
    onClose();
  };

  return (
    <div className={`library-search ${open ? 'open' : ''}`}>
      <button
        type='button'
        className='library-search__toggle'
        aria-label={t('Search in Your Library')}
        onClick={() => {
          if (!open) onOpen();
        }}
      >
        <SearchIcon style={{ height: '1rem' }} />
      </button>

      <div className='library-search__field'>
        <input
          ref={inputRef}
          value={search}
          placeholder={t('Search in Your Library')}
          onChange={(e) => dispatch(yourLibraryActions.setSearch({ search: e.target.value }))}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleClose();
          }}
        />
        <button
          type='button'
          className='library-search__close'
          aria-label='Close'
          onClick={handleClose}
        >
          <CloseIcon2 />
        </button>
      </div>
    </div>
  );
});

const ViewSelector = memo(({ hideLabel = false }: { hideLabel?: boolean }) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation('navbar');
  const view = useAppSelector((state) => state.yourLibrary.view);

  const items = VIEW.map((view) => ({
    key: view,
    label: t(view),
    onClick: () => {
      dispatch(yourLibraryActions.setView({ view }));
    },
  }));

  return (
    <Dropdown
      placement='bottomRight'
      className='viewSelector'
      menu={{ items, selectedKeys: [view] }}
      trigger={['click']}
    >
      <button className={`order-button ${hideLabel ? 'order-button--icon-only' : ''}`}>
        <Space align='center'>
          {!hideLabel ? <span>{t(view)}</span> : null}
          {view === 'GRID' ? <GridIcon style={{ height: '1rem' }} /> : null}
          {view === 'LIST' ? <OrderListIcon style={{ height: '1rem' }} /> : null}
          {view === 'COMPACT' ? <OrderCompactIcon style={{ height: '1rem' }} /> : null}
        </Space>
      </button>
    </Dropdown>
  );
});

export const SearchArea = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Flex
      align='center'
      justify='space-between'
      className='library-search-area'
      style={{ margin: '0px 10px', marginBottom: 10 }}
    >
      <SearchSelector
        open={searchOpen}
        onOpen={() => setSearchOpen(true)}
        onClose={() => setSearchOpen(false)}
      />
      <ViewSelector hideLabel={searchOpen} />
    </Flex>
  );
};

const TypeSelector = memo(() => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation('navbar');
  const filter = useAppSelector((state) => state.yourLibrary.filter);

  const hasAlbums = useAppSelector((state) => state.yourLibrary.myAlbums.length > 0);
  const hasArtists = useAppSelector((state) => state.yourLibrary.myArtists.length > 0);
  const hasPlaylists = useAppSelector((state) => state.yourLibrary.myPlaylists.length > 0);

  const onClick = (filter: YourLibraryState['filter']) => {
    dispatch(yourLibraryActions.setFilter({ filter }));
  };

  const items = useMemo(() => {
    const data: { text: string; type: YourLibraryState['filter'] }[] = [];
    if (hasPlaylists) data.push({ text: 'Playlists', type: 'PLAYLISTS' });
    if (hasArtists) data.push({ text: 'Artists', type: 'ARTISTS' });
    if (hasAlbums) data.push({ text: 'Albums', type: 'ALBUMS' });
    return data;
  }, [hasAlbums, hasArtists, hasPlaylists]);

  if (!hasAlbums && !hasArtists && !hasPlaylists) return null;

  return (
    <Space>
      {filter !== 'ALL' ? (
        <Chip key='close' text={<CloseIcon2 />} onClick={() => onClick('ALL')} />
      ) : null}

      {items.map(({ text, type }) => {
        if (filter === 'ALL' || type === filter) {
          return (
            <Chip
              key={text}
              text={t(text)}
              active={filter === type}
              onClick={() => onClick(type)}
            />
          );
        }
        return null;
      })}
    </Space>
  );
});

export const LibraryFilters = () => {
  return (
    <div>
      <div>
        <TypeSelector />
      </div>
    </div>
  );
};
