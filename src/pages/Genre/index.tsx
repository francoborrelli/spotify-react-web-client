import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GenreContent from './container/content';
import { GenreHeader } from './container/header';

// Redux
import { fetchGenre, genreActions } from '../../store/slices/genre';
import { useAppDispatch, useAppSelector } from '../../store/store';

// Utils
import { getImageAnalysis2 } from '../../utils/imageAnyliser';

export const GenrePage = memo(() => {
  const dispatch = useAppDispatch();

  const params = useParams<{ genreId: string }>();
  const [color, setColor] = useState('rgb(220, 20, 60)');
  const category = useAppSelector((state) => state.genre.category);

  useEffect(() => {
    if (params.genreId) {
      dispatch(fetchGenre(params.genreId));
    }
    return () => {
      dispatch(genreActions.setGenre(null));
    };
  }, [dispatch, params.genreId]);

  useEffect(() => {
    if (category && category.icons.length) {
      const { url } = category.icons[0];
      getImageAnalysis2(url).then((color) => {
        setColor(color);
      });
    }
  }, [category]);

  if (!category) return null;

  return (
    <>
      <GenreHeader color={color} category={category} />
      <GenreContent />
    </>
  );
});

GenrePage.displayName = 'GenrePage';

export default GenrePage;
