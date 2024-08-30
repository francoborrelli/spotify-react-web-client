// Utils
import { FC, RefObject, useEffect } from 'react';

// Components
import HomePageContainer from './container';

// Interfaces
import { useAppDispatch } from '../../store/store';
import { homeActions } from '../../store/slices/home';

interface HomeProps {
  container: RefObject<HTMLDivElement>;
}

const Home: FC<HomeProps> = (props) => {
  const { container } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(homeActions.fetchTopTracks());
    dispatch(homeActions.fetchMadeForYou());
    dispatch(homeActions.fetchNewReleases());
    dispatch(homeActions.fetchRecentlyPlayed());
    dispatch(homeActions.fecthFeaturedPlaylists());
  }, [dispatch]);

  return <HomePageContainer container={container} />;
};

export default Home;
