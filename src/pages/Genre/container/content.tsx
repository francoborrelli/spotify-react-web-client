import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';
import { ItemsList } from '../../Home/components/list';
import { getPlaylistDescription } from '../../../utils/getDescription';

export const GenreContent = memo(() => {
  const [t] = useTranslation(['home']);
  const playlists = useAppSelector((state) => state.genre.playlists);

  return (
    <div style={{ margin: 20, marginTop: 30 }} className='genre-list'>
      <ItemsList
        title={t('Popular playlists')}
        items={playlists}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
});

GenreContent.displayName = 'GenreContent';

export default GenreContent;
