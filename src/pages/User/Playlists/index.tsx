import { FC, memo, useEffect } from 'react';

import ProfilePlaylistsPageContainer from './container';

// Redux
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { profileActions } from '../../../store/slices/profile';

interface ProfilePlaylistsPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const ProfilePlaylistPage: FC<ProfilePlaylistsPageProps> = memo((props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const params = useParams<{ userId: string }>();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!params.userId) return;
    if (user!.id !== params.userId) return navigate(`/users/${params.userId}`);
    dispatch(profileActions.fetchPlaylists(params.userId));
  }, [user, params.userId, dispatch, navigate]);

  return <ProfilePlaylistsPageContainer {...props} />;
});

export default ProfilePlaylistPage;
