import { FC, memo } from 'react';

import { ProfileTracksTable } from '../table';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../store/store';

interface SongsProfileSectionProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SongsProfileSection: FC<SongsProfileSectionProps> = memo((props) => {
  const [t] = useTranslation(['profile']);

  const tracks = useAppSelector((state) => state.profile.songs);

  if (!tracks) return null;

  return (
    <div>
      <Flex>
        <div>
          <h1 className='playlist-header'>{t('Top tracks this month')}</h1>
          <h2 className='playlist-subheader'>{t('Only visible to you')}</h2>
        </div>
      </Flex>
      <ProfileTracksTable {...props} />
    </div>
  );
});
