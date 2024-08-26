import { useMemo } from 'react';

import { Space } from 'antd';
import Chip from '../../../Chip';
import { CloseIcon2 } from '../../../Icons';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions, YourLibraryState } from '../../../../store/slices/yourLibrary';

export const LibraryFilters = () => {
  const dispatch = useAppDispatch();
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
    <div>
      <Space>
        {filter !== 'ALL' ? (
          <Chip key='close' text={<CloseIcon2 />} onClick={() => onClick('ALL')} />
        ) : null}

        {items.map(({ text, type }) => {
          if (filter === 'ALL' || type === filter) {
            return (
              <Chip key={text} text={text} active={filter === type} onClick={() => onClick(type)} />
            );
          }
          return null;
        })}
      </Space>
    </div>
  );
};
