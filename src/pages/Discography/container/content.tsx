import { memo, useMemo } from 'react';
import { useAppSelector } from '../../../store/store';
import { GridItemList } from '../../../components/Lists/list';
import { getAlbumDescription } from '../../../utils/getDescription';
import { orderBy } from 'lodash';

export const DiscographyContent = memo(() => {
  const filter = useAppSelector((state) => state.artistDiscography.filter);
  const albums = useAppSelector((state) => state.artistDiscography.albums);
  const singles = useAppSelector((state) => state.artistDiscography.singles);
  const compilations = useAppSelector((state) => state.artistDiscography.compilations);

  const items = useMemo(() => {
    if (filter === 'Album') return albums;
    if (filter === 'Singles') return singles;
    if (filter === 'Compilations') return compilations;

    const result = [];
    result.push(...albums);
    result.push(...singles);
    result.push(...compilations);
    return orderBy(result, 'release_date', 'desc');
  }, [filter, albums, singles, compilations]);

  return (
    <div style={{ margin: 20, marginTop: 120 }} className='genre-list'>
      <GridItemList items={items} getDescription={getAlbumDescription} />
    </div>
  );
});

DiscographyContent.displayName = 'GenreContent';

export default DiscographyContent;
