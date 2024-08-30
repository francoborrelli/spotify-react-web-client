import { memo, useMemo } from 'react';

import Chip from '../../../Chip';
import { Dropdown, Flex, Space } from 'antd';
import { CloseIcon2, GridIcon, OrderCompactIcon, OrderListIcon, SearchIcon } from '../../../Icons';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions, YourLibraryState } from '../../../../store/slices/yourLibrary';

const VIEW = ['COMPACT', 'LIST', 'GRID'] as const;

const SearchSelector = memo(() => {
  return (
    <button className='addButton'>
      <SearchIcon style={{ height: '1rem' }} />
    </button>
  );
});

const ViewSelector = memo(() => {
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
      <button className='order-button'>
        <Space align='center'>
          <span>{t(view)}</span>
          {view === 'GRID' ? <GridIcon style={{ height: '1rem' }} /> : null}
          {view === 'LIST' ? <OrderListIcon style={{ height: '1rem' }} /> : null}
          {view === 'COMPACT' ? <OrderCompactIcon style={{ height: '1rem' }} /> : null}
        </Space>
      </button>
    </Dropdown>
  );
});

export const SearchArea = () => {
  return (
    <Flex align='center' justify='space-between' style={{ margin: '0px 10px', marginBottom: 10 }}>
      <SearchSelector />
      <ViewSelector />
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
