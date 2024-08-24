import { ProfileBody } from './body';
import { ProfileHeader } from './header';

export const Profile = () => {
  return (
    <div className='Profile-section'>
      <ProfileHeader />
      <ProfileBody />
    </div>
  );
};

export default Profile;
