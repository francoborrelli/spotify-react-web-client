import { memo, useEffect } from 'react';

import RecentlySearchedContent from './container/content';

// Utils
import { useNavigate } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../../store/store';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';

export const RecentlySearchedPage = memo(() => {
  const navigate = useNavigate();
  const searches = useAppSelector((state) => state.searchHistory.items);

  useEffect(() => {
    if (searches.length < 7) {
      navigate('/search');
    }
  }, [navigate, searches]);

  return (
    <>
      <RecentlySearchedContent color={DEFAULT_PAGE_COLOR} />
    </>
  );
});

RecentlySearchedPage.displayName = 'RecentlySearchedPage';

export default RecentlySearchedPage;
