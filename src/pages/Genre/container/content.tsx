import { memo } from 'react';
import { useAppSelector } from '../../../store/store';
import { ItemsList } from '../../Home/components/list';

export const GenreContent = memo(() => {
  const playlists = useAppSelector((state) => state.genre.playlists);

  return (
    <div style={{ margin: 20, marginTop: 30 }} className='genre-list'>
      <ItemsList title='Playlist populares' items={playlists} />
    </div>
  );
});

GenreContent.displayName = 'GenreContent';

export default GenreContent;
