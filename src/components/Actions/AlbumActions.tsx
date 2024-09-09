import { FC, memo, useCallback, useMemo } from 'react';

import { Dropdown, MenuProps, message } from 'antd';
import { AddToQueueIcon, AddedToLibrary, AddToLibrary, AddToPlaylist } from '../Icons';

// Services
import { playerService } from '../../services/player';
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

// Utils
import { useTranslation } from 'react-i18next';

// Interface
import type { Album } from '../../interfaces/albums';

// Redux
import { fetchQueue } from '../../store/slices/queue';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchMyPlaylists, yourLibraryActions } from '../../store/slices/yourLibrary';
import { uiActions } from '../../store/slices/ui';

interface AlbumActionsWrapperProps {
  album: Album;
  isCurrent?: boolean;
  trigger?: ('contextMenu' | 'click')[];
  children: React.ReactNode | React.ReactNode[];
}

export const AlbumActionsWrapper: FC<AlbumActionsWrapperProps> = memo((props) => {
  const { children, album } = props;

  const { t } = useTranslation(['playlist']);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user?.id);
  const myAlbums = useAppSelector((state) => state.yourLibrary.myAlbums);
  const myPlaylists = useAppSelector((state) => state.yourLibrary.myPlaylists);

  const inLibrary = useMemo(() => {
    return myAlbums.some((p) => p.id === album.id);
  }, [myAlbums, album.id]);

  const handleUserValidation = useCallback(
    (button?: boolean) => {
      if (!user) {
        dispatch(button ? uiActions.openLoginButton() : uiActions.openLoginTooltip());
        return false;
      }
      return true;
    },
    [dispatch, user]
  );

  const options = useMemo(() => {
    const items: any[] = myPlaylists.map((p) => {
      return {
        key: p.id,
        label: p.name,
        onClick: async () => {
          if (!handleUserValidation()) return;
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

    if (myPlaylists.length) {
      items.unshift({ type: 'divider' });
    }

    items.unshift({
      label: t('New playlist'),
      key: 'new',
      onClick: async () => {
        if (!handleUserValidation()) return;
        const {
          data: { items: tracks },
        } = await albumsService.fetchAlbumTracks(album.id);
        const uris = tracks.map((t) => t.uri);
        return playlistService.createPlaylist(user!, { name: album.name }).then((response) => {
          const playlist = response.data;
          playlistService.addPlaylistItems(playlist.id, uris, playlist.snapshot_id!).then(() => {
            dispatch(fetchMyPlaylists());
            message.success(t('Added to playlist'));
          });
        });
      },
    });

    return items;
  }, [myPlaylists, t, handleUserValidation, album.id, album.name, user, dispatch]);

  const items = useMemo(() => {
    const items: MenuProps['items'] = [];

    if (inLibrary) {
      items.push({
        label: t('Remove from Your Library'),
        key: 9,
        icon: <AddedToLibrary style={{ height: 16, width: 16, marginInlineEnd: 0 }} />,
        onClick: () => {
          if (!handleUserValidation(true)) return;
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
          if (!handleUserValidation(true)) return;
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
          if (!handleUserValidation()) return;
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
  }, [album.id, album.uri, dispatch, handleUserValidation, inLibrary, options, t]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});
