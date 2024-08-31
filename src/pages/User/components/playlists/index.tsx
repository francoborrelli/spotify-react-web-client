import { memo } from 'react';
import { useAppSelector } from '../../../../store/store';
import { GridItemList } from '../../../../components/Lists/list';
import { useTranslation } from 'react-i18next';

export const MyPlaylistsSection = memo(() => {
  const [t] = useTranslation(['profile']);
  const playlists = useAppSelector((state) => state.profile.playlists);

  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div>
      <GridItemList title={t('Public playlists')} items={playlists} />
    </div>
  );
});
