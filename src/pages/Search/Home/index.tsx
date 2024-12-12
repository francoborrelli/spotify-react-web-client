import { FC, memo, useEffect } from 'react';

import SearchPageContainer from './container';
import NoSearchResults from '../NoResults';

// Utils
import { useParams } from 'react-router-dom';

// Redux
import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchPage: FC<SearchPageProps> = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ search: string }>();

  const topResult = useAppSelector((state) => state.search.top);
  const loading = useAppSelector((state) => state.search.loading);

  useEffect(() => {
    dispatch(searchActions.setSection('ALL'));
  }, [dispatch]);

  useEffect(() => {
    if (params.search) {
      dispatch(searchActions.fetchSearch(params.search));
    }
  }, [dispatch, params.search]);

  if (loading) return null;

  if (!topResult) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchPageContainer {...props} />;
});

export default SearchPage;
