import { FC, memo, useMemo } from 'react';

import { Dropdown, MenuProps, message } from 'antd';
import { AddToQueueIcon, AddedToLibrary, AddToLibrary, AddToPlaylist } from '../Icons';

// Services
import { playerService } from '../../services/player';

// Utils
import { useTranslation } from 'react-i18next';

// Interface
import type { Album } from '../../interfaces/albums';

// Redux
import { fetchQueue } from '../../store/slices/queue';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { yourLibraryActions } from '../../store/slices/yourLibrary';
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

interface AlbumActionsWrapperProps {
  album: Album;
  isCurrent?: boolean;
  onRefresh?: () => void;
  trigger?: ('contextMenu' | 'click')[];
  children: React.ReactNode | React.ReactNode[];
}

export const AlbumActionsWrapper: FC<AlbumActionsWrapperProps> = memo((props) => {
  const { children, album } = props;

  const { t } = useTranslation(['playlist']);

  const dispatch = useAppDispatch();
  const myAlbums = useAppSelector((state) => state.yourLibrary.myAlbums);
  const myPlaylists = useAppSelector((state) => state.yourLibrary.myPlaylists);

  const inLibrary = useMemo(() => {
    return myAlbums.some((p) => p.id === album.id);
  }, [myAlbums, album.id]);

  const options = useMemo(() => {
    return myPlaylists.map((p) => {
      return {
        key: p.id,
        label: p.name,
        onClick: async () => {
          const {
            data: { items: tracks },
          } = await albumsService.fetchAlbumTracks(album.id);
          const uris = tracks.map((t) => t.uri);
          playlistService.addPlaylistItems(p!.id, uris, p?.snapshot_id!).then(() => {
            message.open({
              type: 'success',
              content: t('Added to playlist'),
            });
          });
        },
      };
    });
  }, [myPlaylists, album, t]);

  const items = useMemo(() => {
    const items: MenuProps['items'] = [];

    if (inLibrary) {
      items.push({
        label: t('Remove from Your Library'),
        key: 9,
        icon: <AddedToLibrary style={{ height: 16, width: 16, marginInlineEnd: 0 }} />,
        onClick: () => {
          albumsService.deleteAlbums([album.id]).then(() => {
            dispatch(yourLibraryActions.fetchMyAlbums());
            message.open({
              type: 'success',
              content: t('Removed from Your Library'),
            });
          });
        },
      });
    } else {
      items.push({
        label: t('Add to Your Library'),
        key: 8,
        icon: <AddToLibrary style={{ height: 16, width: 16, marginInlineEnd: 0 }} />,
        onClick: () => {
          albumsService.saveAlbums([album.id]).then(() => {
            dispatch(yourLibraryActions.fetchMyAlbums());
            message.open({
              type: 'success',
              content: t('Saved to Your Library'),
            });
          });
        },
      });
    }

    items.push(
      {
        label: t('Add to queue'),
        key: '3',
        disabled: true,
        icon: <AddToQueueIcon />,
        onClick: () => {
          playerService.addToQueue(album.uri).then(() => {
            dispatch(fetchQueue());
            message.open({
              type: 'success',
              content: t('Added to queue'),
            });
          });
        },
      },
      { type: 'divider' },
      {
        label: t('Add to playlist'),
        icon: <AddToPlaylist />,
        key: '1',
        children: options,
      }
    );

    return items;
  }, [album.id, album.uri, dispatch, inLibrary, options, t]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});
