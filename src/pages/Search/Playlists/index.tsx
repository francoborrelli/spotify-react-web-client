import { FC, memo, useEffect } from 'react';

import NoSearchResults from '../NoResults';
import SearchPlaylistPageContainer from './container';

// Utils
import { useParams } from 'react-router-dom';

// Redux
import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchPlaylistPage: FC<SearchPageProps> = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams<{ search: string }>();

  const playlists = useAppSelector((state) => state.search.playlists);

  useEffect(() => {
    dispatch(searchActions.setSection('PLAYLISTS'));
  }, [dispatch]);

  useEffect(() => {
    if (params.search) {
      dispatch(searchActions.fetchPlaylists(params.search));
    }
  }, [dispatch, params.search]);

  if (!playlists) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchPlaylistPageContainer {...props} />;
});

export default SearchPlaylistPage;
