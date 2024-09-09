import { FC, memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../../../components/Tooltip';
import { AddedToLibrary, AddToLibrary } from '../../../../components/Icons';

// Services
import { albumsService } from '../../../../services/albums';

// Redux
import { uiActions } from '../../../../store/slices/ui';
import { albumActions } from '../../../../store/slices/album';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

const FollowAlbum: FC<{ id: string; onToggle: () => void; size?: number }> = ({
  id,
  size,
  onToggle,
}) => {
  const { t } = useTranslation(['playlist']);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleAddToLibrary = () => {
    if (!user) return dispatch(uiActions.openLoginTooltip());
    return albumsService.saveAlbums([id]).then(() => {
      dispatch(albumActions.setFollowing({ following: true }));
      onToggle();
    });
  };

  return (
    <Tooltip title={t('Add to Your Library')}>
      <button onClick={handleAddToLibrary}>
        <AddToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

const UnfollowAlbum: FC<{ id: string; onToggle: () => void; size?: number }> = ({
  id,
  size,
  onToggle,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleDeleteFromLibrary = useCallback(() => {
    if (!user) return dispatch(uiActions.openLoginTooltip());
    return albumsService.deleteAlbums([id]).then(() => {
      dispatch(albumActions.setFollowing({ following: false }));
      onToggle();
    });
  }, [dispatch, id, onToggle, user]);

  return (
    <Tooltip title={t('Remove from Your Library')}>
      <button onClick={handleDeleteFromLibrary}>
        <AddedToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

export const AddAlbumToLibraryButton = memo(({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const isSaved = useAppSelector((state) => state.album.following);

  const onToggle = useCallback(() => {
    dispatch(yourLibraryActions.fetchMyAlbums());
  }, [dispatch]);

  return isSaved ? (
    <UnfollowAlbum size={32} id={id} onToggle={onToggle} />
  ) : (
    <FollowAlbum size={32} id={id} onToggle={onToggle} />
  );
});
