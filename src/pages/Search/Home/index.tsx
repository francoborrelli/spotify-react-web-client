import { FC, memo, useEffect } from 'react';

import SearchPageContainer from './container';
import NoSearchResults from '../components/noResults';

// Utils
import { useParams } from 'react-router-dom';

// Redux
import { fetchSearch } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement>;
}

export const SearchPage: FC<SearchPageProps> = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ search: string }>();

  const topResult = useAppSelector((state) => state.search.top);
  const loading = useAppSelector((state) => state.search.loading);

  useEffect(() => {
    if (params.search) {
      dispatch(fetchSearch(params.search));
    }
  }, [dispatch, params.search]);

  if (loading) return null;

  if (!topResult) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchPageContainer {...props} />;
});

export default SearchPage;
