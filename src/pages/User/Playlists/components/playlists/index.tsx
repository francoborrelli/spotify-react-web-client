import { memo } from 'react';

// Components
import { GridItemList } from '../../../../../components/Lists/list';

// Redux
import { useAppSelector } from '../../../../../store/store';
import { useTranslation } from 'react-i18next';

export const PlaylistsProfileSection = memo(() => {
  const [t] = useTranslation(['profile']);
  const playlists = useAppSelector((state) => state.profile.playlists);

  return (
    <div>
      <GridItemList multipleRows items={playlists} title={t('Public playlists')} />
    </div>
  );
});
