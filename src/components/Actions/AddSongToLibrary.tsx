import { FC } from 'react';

import { Tooltip } from '../Tooltip';
import { useTranslation } from 'react-i18next';
import { userService } from '../../services/users';
import { AddedToLibrary, AddToLibrary } from '../Icons';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { albumActions } from '../../store/slices/album';
import { artistActions } from '../../store/slices/artist';
import { playlistActions } from '../../store/slices/playlist';
import { uiActions } from '../../store/slices/ui';

const AddSongToLibrary: FC<{ id: string; onToggle: () => void; size?: number }> = ({
  id,
  size,
  onToggle,
}) => {
  const { t } = useTranslation(['playlist']);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleAddToLibrary = () => {
    if (!user) {
      dispatch(uiActions.openLoginButton());
      return;
    }
    userService.saveTracks([id]).then(() => {
      message.success(t('Song added to Liked Songs'));
      onToggle();
      dispatch(albumActions.updateTrackLikeState({ id: id!, saved: true }));
      dispatch(artistActions.setTopSongLikeState({ id: id!, saved: true }));
      dispatch(playlistActions.setTrackLikeState({ id: id!, saved: true }));
    });
  };

  return (
    <Tooltip title={t('Add to Liked Songs')}>
      <button className='actions' onClick={handleAddToLibrary}>
        <AddToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

const DeleteSongFromLibrary: FC<{ id: string; onToggle: () => void; size?: number }> = ({
  id,
  size,
  onToggle,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleDeleteFromLibrary = () => {
    if (!user) {
      dispatch(uiActions.openLoginButton());
      return;
    }
    userService.deleteTracks([id]).then(() => {
      message.success(t('Song removed from Liked Songs'));
      onToggle();
      dispatch(albumActions.updateTrackLikeState({ id: id!, saved: false }));
      dispatch(artistActions.setTopSongLikeState({ id: id!, saved: false }));
      dispatch(playlistActions.setTrackLikeState({ id: id!, saved: false }));
    });
  };

  return (
    <Tooltip title={t('Remove from Liked Songs')}>
      <button onClick={handleDeleteFromLibrary}>
        <AddedToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

export const AddSongToLibraryButton = ({
  id,
  isSaved,
  onToggle,
  size = 24,
}: {
  id: string;
  size?: number;
  isSaved: boolean;
  onToggle: () => void;
}) => {
  return isSaved ? (
    <DeleteSongFromLibrary size={size} id={id} onToggle={onToggle} />
  ) : (
    <AddSongToLibrary size={size} id={id} onToggle={onToggle} />
  );
};
