import { FC, useRef } from 'react';

import { SearchHeader } from './header';
import { Outlet } from 'react-router-dom';
import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';

// Constants

interface SearchPageProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const SearchContainer: FC<SearchPageProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <SearchHeader color={DEFAULT_PAGE_COLOR} sectionContainer={ref} container={props.container} />
      <div className='Search-Page'>
        <Outlet />
      </div>
    </div>
  );
};

export default SearchContainer;
