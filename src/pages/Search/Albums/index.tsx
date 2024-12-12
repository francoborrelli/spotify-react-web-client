import { FC, memo, useEffect } from 'react';

import NoSearchResults from '../NoResults';
import SearchAlbumsPageContainer from './container';

// Utils
import { useParams } from 'react-router-dom';

// Redux
import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchAlbumsPage: FC<SearchPageProps> = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ search: string }>();

  const loading = useAppSelector((state) => state.search.loading);
  const albums = useAppSelector((state) => state.search.albums);

  useEffect(() => {
    dispatch(searchActions.setSection('ALBUMS'));
  }, [dispatch]);

  useEffect(() => {
    if (params.search) {
      dispatch(searchActions.fetchAlbums(params.search));
    }
  }, [dispatch, params.search]);

  if (loading) return null;

  if (!albums) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchAlbumsPageContainer {...props} />;
});

export default SearchAlbumsPage;
