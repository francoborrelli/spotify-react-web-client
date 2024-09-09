import { FC, memo, useCallback, useMemo } from 'react';

import {
  AlbumIcon,
  ArtistIcon,
  DeleteIcon,
  AddToPlaylist,
  AddToQueueIcon,
  AddToLibrary,
  AddedToLibrary,
} from '../Icons';
import { Dropdown, MenuProps, message } from 'antd';

// Services
import { playerService } from '../../services/player';
import { playlistService } from '../../services/playlists';

// Utils
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Interface
import type { Track } from '../../interfaces/track';
import type { Album } from '../../interfaces/albums';
import type { Playlist } from '../../interfaces/playlists';

// Redux
import { fetchQueue } from '../../store/slices/queue';
import { playlistActions } from '../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  fetchMyPlaylists,
  getUserPlaylists,
  yourLibraryActions,
} from '../../store/slices/yourLibrary';
import { userService } from '../../services/users';
import { likedSongsActions } from '../../store/slices/likedSongs';
import { spotifyActions } from '../../store/slices/spotify';
import { albumActions } from '../../store/slices/album';
import { artistActions } from '../../store/slices/artist';
import { Artist } from '../../interfaces/artist';
import { uiActions } from '../../store/slices/ui';

interface TrackActionsWrapperProps {
  canEdit?: boolean;
  saved?: boolean;
  album?: Album | null;
  artist?: Artist | null;
  onSavedToggle?: () => void;
  playlist?: Playlist | null;
  track: Track | Spotify.Track;
  trigger?: ('contextMenu' | 'click')[];
  children: React.ReactNode | React.ReactNode[];
}

export const TrackActionsWrapper: FC<TrackActionsWrapperProps> = memo((props) => {
  const { children, artist, track, playlist, canEdit, album, saved, onSavedToggle } = props;

  const { t } = useTranslation(['playlist']);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myPlaylists = useAppSelector(getUserPlaylists);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const currentSong = useAppSelector(
    (state) => state.spotify.state?.track_window?.current_track?.id
  );

  const handleUserValidation = useCallback(
    (button?: boolean) => {
      if (!userId) {
        dispatch(button ? uiActions.openLoginButton() : uiActions.openLoginTooltip());
        return false;
      }
      return true;
    },
    [dispatch, userId]
  );

  const options = useMemo(() => {
    return myPlaylists
      .filter((p) => p.id !== playlist?.id)
      .map((p) => {
        return {
          key: p.id,
          label: p.name,
          onClick: () => {
            if (!handleUserValidation()) return;
            playlistService.addPlaylistItems(p!.id, [track.uri], p?.snapshot_id!).then(() => {
              dispatch(playlistActions.refreshTracks(playlist!.id));
              message.open({
                type: 'success',
                content: t('Added to playlist'),
              });
            });
          },
        };
      });
  }, [myPlaylists, playlist, handleUserValidation, track.uri, dispatch, t]);

  const getItems = () => {
    const items: MenuProps['items'] = [
      {
        label: t('Add to playlist'),
        icon: <AddToPlaylist />,
        key: '1',
        children: [
          {
            label: t('New playlist'),
            key: 'new',
            onClick: () => {
              if (!handleUserValidation()) return;
              return playlistService
                .createPlaylist(userId!, { name: track.name })
                .then((response) => {
                  const playlist = response.data;
                  playlistService
                    .addPlaylistItems(playlist.id, [track.uri], playlist.snapshot_id!)
                    .then(() => {
                      dispatch(fetchMyPlaylists());
                      message.success(t('Added to playlist'));
                    });
                });
            },
          },
          { type: 'divider' },
          ...options,
        ],
      },
    ];

    if (saved !== undefined) {
      items.push({
        label: saved ? t('Remove from Liked Songs') : t('Save to Liked Songs'),
        key: '4',
        icon: saved ? (
          <AddedToLibrary style={{ height: 18, width: 18, marginInlineEnd: 0 }} />
        ) : (
          <AddToLibrary style={{ height: 18, width: 18, marginInlineEnd: 0 }} />
        ),
        onClick: () => {
          if (!handleUserValidation(true)) return;
          if (saved) {
            userService.deleteTracks([track.id!]).then(() => {
              dispatch(likedSongsActions.removeSong({ id: track.id! }));
              dispatch(albumActions.updateTrackLikeState({ id: track.id!, saved: false }));
              dispatch(artistActions.setTopSongLikeState({ id: track.id!, saved: false }));
              dispatch(playlistActions.setTrackLikeState({ id: track.id!, saved: false }));

              if (currentSong === track.id) {
                dispatch(spotifyActions.setLiked({ liked: false }));
              }

              if (onSavedToggle) onSavedToggle();
              message.open({
                type: 'success',
                content: t('Removed from Liked Songs'),
              });
            });
          } else {
            userService.saveTracks([track.id!]).then(() => {
              if (onSavedToggle) onSavedToggle();

              dispatch(albumActions.updateTrackLikeState({ id: track.id!, saved: true }));
              dispatch(artistActions.setTopSongLikeState({ id: track.id!, saved: true }));
              dispatch(playlistActions.setTrackLikeState({ id: track.id!, saved: true }));

              dispatch(likedSongsActions.fetchLikeSongs());

              if (currentSong === track.id) {
                dispatch(spotifyActions.setLiked({ liked: true }));
              }

              message.open({
                type: 'success',
                content: t('Saved to Liked Songs'),
              });
            });
          }
        },
      });
    }

    if (canEdit && playlist) {
      items.push({
        label: t('Remove from this playlist'),
        key: '2',
        icon: <DeleteIcon />,
        onClick: () => {
          if (!handleUserValidation()) return;
          return playlistService
            .removePlaylistItems(playlist!.id, [track.uri], playlist?.snapshot_id!)
            .then(() => {
              dispatch(playlistActions.refreshPlaylist(playlist!.id));
              dispatch(playlistActions.removeTrack({ id: track.uri }));
              dispatch(yourLibraryActions.fetchMyPlaylists());
              message.open({
                type: 'success',
                content: t('Removed from playlist'),
              });
            });
        },
      });
    }

    items.push(
      {
        label: t('Add to queue'),
        key: '3',
        icon: <AddToQueueIcon />,
        onClick: () => {
          if (!handleUserValidation(true)) return;
          return playerService.addToQueue(track.uri).then(() => {
            dispatch(fetchQueue());
            message.open({
              type: 'success',
              content: t('Added to queue'),
            });
          });
        },
      },
      { type: 'divider' }
    );

    if (!artist) {
      items.push({
        label: t('Go to artist'),
        key: '5',
        icon: <ArtistIcon />,
        onClick: () => {
          navigate(
            // @ts-ignore
            `/artist/${track.artists[0]?.id || track.artists[0].uri.split(':').reverse()[0]}`
          );
        },
      });
    }

    if (!album) {
      items.push({
        label: t('Go to album'),
        key: '6',
        icon: <AlbumIcon />,
        onClick: () => {
          if (!userId) {
            return dispatch(uiActions.openLoginModal(track.album.images[0].url));
          }
          // @ts-ignore
          navigate(`/album/${track.album?.id || track.album.uri.split(':').reverse()[0]}`);
        },
      });
    }

    return items;
  };

  const items = getItems();

  return (
    <>
      <Dropdown menu={{ items }} trigger={props.trigger}>
        {children}
      </Dropdown>
    </>
  );
});
