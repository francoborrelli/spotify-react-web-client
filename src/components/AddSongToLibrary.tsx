import { FC } from 'react';

import { Tooltip } from './Tooltip';
import { useTranslation } from 'react-i18next';
import { userService } from '../services/users';
import { AddedToLibrary, AddToLibrary } from './Icons';

const AddSongToLibrary: FC<{ id: string; onToggle: () => void; size?: number }> = ({
  id,
  size,
  onToggle,
}) => {
  const { t } = useTranslation();

  const handleAddToLibrary = () => {
    userService.saveTracks([id]).then(() => onToggle());
  };

  return (
    <Tooltip title={t('Add to Liked Songs')}>
      <button onClick={handleAddToLibrary}>
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

  const handleDeleteFromLibrary = () => {
    userService.deleteTracks([id]).then(() => onToggle());
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
