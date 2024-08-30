import { FC, memo } from 'react';

import { message } from 'antd';
import { useTranslation } from 'react-i18next';

// Interfaces
import type { Track } from '../../../interfaces/track';

// Services
import { playlistService } from '../../../services/playlists';

// Redux
import { playlistActions } from '../../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { yourLibraryActions } from '../../../store/slices/yourLibrary';

export const AddRecommendation: FC<{ song: Track }> = memo(({ song }) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['playlist']);
  const playlist = useAppSelector((state) => state.playlist.playlist);

  const onClick = () => {
    if (!playlist) return;
    return playlistService
      .addPlaylistItems(playlist.id, [song.uri], playlist.snapshot_id)
      .then(() => {
        message.success(t('Added to playlist'));
        dispatch(yourLibraryActions.fetchMyPlaylists());
        dispatch(playlistActions.refreshPlaylist(playlist.id));
        dispatch(playlistActions.refreshTracks(playlist.id));
        dispatch(playlistActions.removeTrackFromRecommendations({ id: song.id }));
      });
  };

  return (
    <button onClick={onClick} className='transparent-button'>
      {t('Add')}
    </button>
  );
});
