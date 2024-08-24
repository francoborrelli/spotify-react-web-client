import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../components/Tooltip';
import { ALL_SOCIAL_NETWORKS } from '../../constants/socialNetworks';

export const ProfileBody = () => {
  const { t } = useTranslation(['profile']);

  return (
    <div className='profile-body'>
      <div className='social-networks'>
        <Space>
          {ALL_SOCIAL_NETWORKS.map((socialNetwork) => (
            <Tooltip title={socialNetwork.name} placement='top' key={socialNetwork.name}>
              <a
                target={'_blank'}
                className='link-social-button'
                href={socialNetwork.link}
                rel='noreferrer'
              >
                {socialNetwork.icon}
              </a>
            </Tooltip>
          ))}
        </Space>
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
