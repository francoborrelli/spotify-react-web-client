import { FC, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

// Redux
import { artistActions } from '../../../../store/slices/artist';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

// Services
import { userService } from '../../../../services/users';
import { uiActions } from '../../../../store/slices/ui';

// Redux

const FollowArtist: FC<{ id: string; onToggle: () => void; size?: number }> = ({
  id,
  onToggle,
}) => {
  const { t } = useTranslation(['artist']);
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => !!state.auth.user,
    (prev, next) => prev === next
  );

  const handleFollow = useCallback(() => {
    if (!user) {
      return dispatch(uiActions.openLoginTooltip());
    }
    userService.unfollowArtists([id]).then(() => {
      dispatch(artistActions.setFollowing({ following: true }));
      onToggle();
    });
  }, [dispatch, id, onToggle, user]);

  return (
    <button className='transparent-button' onClick={handleFollow}>
      {t('Follow')}
    </button>
  );
};

const UnfollowArtist: FC<{ id: string; onToggle: () => void; size?: number }> = ({
  id,
  onToggle,
}) => {
  const { t } = useTranslation(['artist']);
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => !!state.auth.user,
    (prev, next) => prev === next
  );

  const handleUnfollow = useCallback(() => {
    if (!user) {
      return dispatch(uiActions.openLoginTooltip());
    }
    userService.unfollowArtists([id]).then(() => {
      dispatch(artistActions.setFollowing({ following: false }));
      onToggle();
    });
  }, [dispatch, id, onToggle, user]);

  return (
    <button className='transparent-button' onClick={handleUnfollow}>
      {t('Unfollow')}
    </button>
  );
};

export const FollowArtistButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const isSaved = useAppSelector((state) => state.artist.following);

  const onToggle = () => {
    dispatch(yourLibraryActions.fetchMyArtists());
  };

  return isSaved ? (
    <UnfollowArtist size={32} id={id} onToggle={onToggle} />
  ) : (
    <FollowArtist size={32} id={id} onToggle={onToggle} />
  );
};
