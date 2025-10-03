import { FC, memo, useEffect } from 'react';

import ProfileSongsPageContainer from './container';

// Redux
import { useNavigate, useParams } from 'react-router-dom';
import { profileActions } from '../../../store/slices/profile';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface ProfileSongsPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const ProfileSongsPage: FC<ProfileSongsPageProps> = memo((props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const params = useParams<{ userId: string }>();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!params.userId) return;
    if (user!.id !== params.userId) return navigate(`/users/${params.userId}`);
    dispatch(profileActions.fetchMyTracks());
  }, [user, params.userId, dispatch, navigate]);

  return <ProfileSongsPageContainer {...props} />;
});

export default ProfileSongsPage;
