import { memo, useEffect } from 'react';
import BrowsePageContainer from './container';

// Redux
import { useAppDispatch } from '../../store/store';
import { fetchCategories } from '../../store/slices/browse';

export const BrowsePage = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return <BrowsePageContainer />;
});

BrowsePage.displayName = 'BrowsePage';

export default BrowsePage;
