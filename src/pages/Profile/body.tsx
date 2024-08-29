import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export const ProfileBody = () => {
  const { t } = useTranslation(['profile']);

  return (
    <div className='profile-body'>
      <div className='social-networks'>
        <Space></Space>
      </div>
      <h3 className='about-me-title'>{t('About me')}</h3>

      <div className='about-me-text'>
        {t('About me description')
          .split('\n')
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </div>
    </div>
  );
};
