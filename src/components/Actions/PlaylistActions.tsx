import { FC, memo, useMemo } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa6';
import { Dropdown, MenuProps, message } from 'antd';
import { DeleteIcon, AddToQueueIcon, EditIcon, AddedToLibrary, AddToLibrary } from '../Icons';

// Services
import { userService } from '../../services/users';
import { playerService } from '../../services/player';
import { playlistService } from '../../services/playlists';

// Utils
import { useTranslation } from 'react-i18next';

// Interface
import type { Playlist } from '../../interfaces/playlists';

// Redux
import { fetchQueue } from '../../store/slices/queue';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { yourLibraryActions } from '../../store/slices/yourLibrary';
import { editPlaylistModalActions } from '../../store/slices/editPlaylistModal';

interface PlayistActionsWrapperProps {
  playlist: Playlist;
  isCurrent?: boolean;
  onRefresh?: () => void;
  trigger?: ('contextMenu' | 'click')[];
  children: React.ReactNode | React.ReactNode[];
}

export const PlayistActionsWrapper: FC<PlayistActionsWrapperProps> = memo((props) => {
  const { children, playlist } = props;

  const { t } = useTranslation(['playlist']);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const myPlaylists = useAppSelector((state) => state.yourLibrary.myPlaylists);
  const canEdit = useMemo(() => user?.id === playlist.owner?.id, [user?.id, playlist.owner?.id]);

  const inLibrary = useMemo(() => {
    return myPlaylists.some((p) => p.id === playlist.id);
  }, [myPlaylists, playlist.id]);

  const items = useMemo(() => {
    const items: MenuProps['items'] = [];

    if (canEdit) {
      items.push(
        {
          label: t('Edit details'),
          key: 1,
          icon: <EditIcon />,
          onClick: () => {
            dispatch(editPlaylistModalActions.setPlaylist({ playlist }));
          },
        },
        {
          label: t('Delete playlist'),
          key: '2',
          disabled: true,
          icon: <DeleteIcon />,
        },
        {
          type: 'divider',
        }
      );

      if (playlist.public) {
        items.push({
          label: t('Make private'),
          key: 4,
          icon: <FaLock size={16} fill='#bababa' style={{ padding: 0, marginInlineEnd: 0 }} />,
          onClick: () => {
            playlistService.changePlaylistDetails(playlist.id, { public: false }).then(() => {
              props.onRefresh?.();
              message.open({
                type: 'success',
                content: t('Playlist is now private'),
              });
            });
          },
        });
      } else {
        items.push({
          label: t('Make public'),
          key: 5,
          icon: <FaUnlock size={16} fill='#bababa' style={{ padding: 0, marginInlineEnd: 0 }} />,
          onClick: () => {
            playlistService
              .changePlaylistDetails(playlist.id, { public: true, collaborative: false })
              .then(() => {
                props.onRefresh?.();
                message.open({
                  type: 'success',
                  content: t('Playlist is now public'),
                });
              });
          },
        });
      }
    } else {
      if (inLibrary) {
        items.push(
          {
            label: t('Remove from Your Library'),
            key: 9,
            icon: <AddedToLibrary style={{ height: 16, width: 16, marginInlineEnd: 0 }} />,
            onClick: () => {
              userService.unfollowPlaylist(playlist.id).then(() => {
                dispatch(yourLibraryActions.fetchMyPlaylists());
                message.open({
                  type: 'success',
                  content: t('Removed from Your Library'),
                });
              });
            },
          },
          {
            type: 'divider',
          }
        );
      } else {
        items.push(
          {
            label: t('Add to Your Library'),
            key: 8,
            icon: <AddToLibrary style={{ height: 16, width: 16, marginInlineEnd: 0 }} />,
            onClick: () => {
              userService.followPlaylist(playlist.id).then(() => {
                dispatch(yourLibraryActions.fetchMyPlaylists());
                message.open({
                  type: 'success',
                  content: t('Saved to Your Library'),
                });
              });
            },
          },
          {
            type: 'divider',
          }
        );
      }
    }

    items.push({
      label: t('Add to queue'),
      key: '3',
      disabled: true,
      icon: <AddToQueueIcon />,
      onClick: () => {
        playerService.addToQueue(playlist.uri).then(() => {
          dispatch(fetchQueue());
          message.open({
            type: 'success',
            content: t('Added to queue'),
          });
        });
      },
    });

    return items;
  }, [canEdit, dispatch, inLibrary, playlist, props, t]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});
