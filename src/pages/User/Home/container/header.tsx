// I18n
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { FC, memo } from 'react';
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';

export const UserHeader: FC<{ color: string }> = memo((props) => {
  const { t } = useTranslation(['profile']);
  const user = useAppSelector((state) => state.profile.user);

  return (
    <div className='profile-header'>
      <div
        className='profile-header-cover'
        style={{
          backgroundColor: props.color,
        }}
      ></div>

      <div className='profile-header-background'></div>
      <div className='profile-header-content'>
        {/* Image section */}
        <div></div>
        <div className='profile-img-container'>
          <div className='profile-img'>
            <div
              style={{
                borderRadius: 4,
                height: '100%',
                width: '100%',
              }}
            >
              <img
                src={
                  user?.images && user.images.length ? user.images[0].url : ARTISTS_DEFAULT_IMAGE
                }
                alt={user?.display_name}
              />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className='profile-header-text'>
          <span className='type'>{t('Profile')}</span>

          <span className='profile-header-name-container'>
            <h1>{user?.display_name}</h1>
          </span>

          <div className='profile-header-details-container'>
            <span data-encore-id='text'>
              {user?.followers?.total || 0} {t('Followers')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
