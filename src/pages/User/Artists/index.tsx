import { FC, memo, useEffect } from 'react';

import ProfileArtistsPageContainer from './container';

// Redux
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { profileActions } from '../../../store/slices/profile';

interface ProfileArtistsPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const ProfileArtistsPage: FC<ProfileArtistsPageProps> = memo((props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const params = useParams<{ userId: string }>();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!params.userId) return;
    if (user!.id !== params.userId) return navigate(`/users/${params.userId}`);
    dispatch(profileActions.fetchMyArtists());
  }, [user, params.userId, dispatch, navigate]);

  return <ProfileArtistsPageContainer {...props} />;
});

export default ProfileArtistsPage;
