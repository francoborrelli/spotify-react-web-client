import { FC, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../../components/Tooltip';
import { AddedToLibrary, AddToLibrary } from '../../../components/Icons';

// Services
import { userService } from '../../../services/users';

// Redux
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { yourLibraryActions } from '../../../store/slices/yourLibrary';

const FollowPlaylist: FC<{ id: string; onToggle: () => void; size?: number }> = ({
  id,
  size,
  onToggle,
}) => {
  const { t } = useTranslation(['playlist']);

  const handleAddToLibrary = () => {
    userService.followPlaylist(id).then(() => onToggle());
  };

  return (
    <Tooltip title={t('Add to Your Library')}>
      <button onClick={handleAddToLibrary}>
        <AddToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

const UnfollowPlaylist: FC<{ id: string; onToggle: () => void; size?: number }> = ({
  id,
  size,
  onToggle,
}) => {
  const { t } = useTranslation();

  const handleDeleteFromLibrary = useCallback(() => {
    userService.unfollowPlaylist(id).then(() => onToggle());
  }, [id, onToggle]);

  return (
    <Tooltip title={t('Remove from Your Library')}>
      <button onClick={handleDeleteFromLibrary}>
        <AddedToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

export const AddPlaylistToLibraryButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const myPlaylists = useAppSelector((state) => state.yourLibrary.myPlaylists);
  const isSaved = useMemo(
    () => myPlaylists.some((playlist) => playlist.id === id),
    [myPlaylists, id]
  );
  const onToggle = () => {
    dispatch(yourLibraryActions.fetchMyPlaylists());
  };

  return isSaved ? (
    <UnfollowPlaylist size={32} id={id} onToggle={onToggle} />
  ) : (
    <FollowPlaylist size={32} id={id} onToggle={onToggle} />
  );
};
