import { FC, memo, useEffect } from 'react';

import NoSearchResults from '../NoResults';
import { SearchSongsPageContainer } from './container';

// Utils
import { useParams } from 'react-router-dom';

// Redux
import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchSongsPage: FC<SearchPageProps> = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ search: string }>();

  const loading = useAppSelector((state) => state.search.loading);
  const songs = useAppSelector((state) => state.search.songs);

  useEffect(() => {
    dispatch(searchActions.setSection('TRACKS'));
  }, [dispatch]);

  useEffect(() => {
    if (params.search) {
      dispatch(searchActions.fetchSongs(params.search));
    }
  }, [dispatch, params.search]);

  if (loading) return null;

  if (!songs) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchSongsPageContainer {...props} query={params.search!} />;
});

export default SearchSongsPage;
