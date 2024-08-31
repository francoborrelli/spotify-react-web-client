import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GenreContent from './container/content';
import { GenreHeader } from './container/header';

// Redux
import { fetchGenre, genreActions } from '../../store/slices/genre';
import { useAppDispatch, useAppSelector } from '../../store/store';

// Utils
import { getImageAnalysis2 } from '../../utils/imageAnyliser';
import tinycolor from 'tinycolor2';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../constants/spotify';

export const GenrePage = memo(() => {
  const dispatch = useAppDispatch();

  const params = useParams<{ genreId: string }>();
  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);
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
        setColor(tinycolor(color).saturate(60).lighten(10).toHexString());
      });
    }
  }, [category]);

  if (!category) return null;

  return (
    <>
      <GenreHeader color={color} category={category} />
      <GenreContent color={color} />
    </>
  );
});

GenrePage.displayName = 'GenrePage';

export default GenrePage;
