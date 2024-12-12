import { FC, memo, useEffect } from 'react';

import SearchArtistsPageContainer from './container';
import NoSearchResults from '../NoResults';

// Utils
import { useParams } from 'react-router-dom';

// Redux
import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchArtistsPage: FC<SearchPageProps> = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ search: string }>();

  const loading = useAppSelector((state) => state.search.loading);
  const artists = useAppSelector((state) => state.search.artists);

  useEffect(() => {
    dispatch(searchActions.setSection('ARTISTS'));
  }, [dispatch]);

  useEffect(() => {
    if (params.search) {
      dispatch(searchActions.fetchArtists(params.search));
    }
  }, [dispatch, params.search]);

  if (loading) return null;

  if (!artists) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchArtistsPageContainer {...props} />;
});

export default SearchArtistsPage;
