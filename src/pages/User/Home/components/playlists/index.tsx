import { memo } from 'react';
import { useAppSelector } from '../../../../../store/store';
import { GridItemList } from '../../../../../components/Lists/list';
import { useTranslation } from 'react-i18next';
import useIsMobile from '../../../../../utils/isMobile';

export const MyPlaylistsSection = memo(() => {
  const isMobile = useIsMobile();
  const [t] = useTranslation(['profile']);

  const user = useAppSelector((state) => state.profile.user);
  const playlists = useAppSelector((state) => state.profile.playlists);

  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div style={{ marginTop: 10 }}>
      <GridItemList
        items={playlists}
        title={t('Public playlists')}
        moreUrl={playlists.length > (isMobile ? 2 : 6) ? `/users/${user!.id}/playlists` : undefined}
      />
    </div>
  );
});
