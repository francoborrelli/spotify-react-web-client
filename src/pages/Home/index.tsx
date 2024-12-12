// Utils
import { FC, memo, RefObject, useEffect } from 'react';

// Components
import HomePageContainer from './container';

// Interfaces
import { homeActions } from '../../store/slices/home';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface HomeProps {
  container: RefObject<HTMLDivElement | null>;
}

const Home: FC<HomeProps> = memo((props) => {
  const { container } = props;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(homeActions.fetchTopTracks());
      dispatch(homeActions.fetchMadeForYou());
      dispatch(homeActions.fetchRecentlyPlayed());
    }
    dispatch(homeActions.fetchRanking());
    dispatch(homeActions.fetchTrending());
    dispatch(homeActions.fetchNewReleases());
    dispatch(homeActions.fecthFeaturedPlaylists());
  }, [user, dispatch]);

  return <HomePageContainer container={container} />;
});

export default Home;
