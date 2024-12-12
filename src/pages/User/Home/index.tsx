import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { FC, RefObject, useEffect } from 'react';
import { profileActions } from '../../../store/slices/profile';
import ProfileContainer from './container';

interface ProfilePageProps {
  container: RefObject<HTMLDivElement | null>;
}

export const Profile: FC<ProfilePageProps> = (props) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ userId: string }>();
  const user = useAppSelector((state) => state.profile.user);

  useEffect(() => {
    if (params.userId) dispatch(profileActions.fetchUser(params.userId));
    return () => {
      dispatch(profileActions.removeUser());
    };
  }, [dispatch, params.userId]);

  if (!user) return null;

  return <ProfileContainer container={props.container} />;
};

export default Profile;
