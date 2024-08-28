/* eslint-disable react-hooks/exhaustive-deps */
import './styles/App.scss';

// Utils
import i18next from 'i18next';
import { FC, Suspense, lazy, memo, useEffect, useRef } from 'react';

// Components
import { ConfigProvider } from 'antd';
import { AppLayout } from './components/Layout';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { libraryActions } from './store/slices/library';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store, useAppDispatch, useAppSelector } from './store/store';
import { SearchPage } from './pages/Search';
import { authActions, fetchUser, loginToSpotify } from './store/slices/auth';
import { Spinner } from './components/spinner/spinner';

import { getFromLocalStorageWithExpiry } from './utils/localstorage';
import WebPlayback, { WebPlaybackProps } from './utils/spotify/webPlayback';

// Pages
const Home = lazy(() => import('./pages/Home'));
const Page404 = lazy(() => import('./pages/404'));
const Profile = lazy(() => import('./pages/Profile'));
const AlbumView = lazy(() => import('./pages/Album'));
const GenrePage = lazy(() => import('./pages/Genre'));
const BrowsePage = lazy(() => import('./pages/Browse'));
const PlaylistView = lazy(() => import('./pages/Playlist'));

window.addEventListener('resize', () => {
  const vh = window.innerWidth;
  if (vh < 950) {
    store.dispatch(libraryActions.collapseLibrary());
  }
});

const SpotifyContainer: FC<{ children: any }> = memo(({ children }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const token = getFromLocalStorageWithExpiry('access_token');
    if (!token) {
      dispatch(loginToSpotify());
    } else {
      dispatch(authActions.setToken({ token }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
    }
  }, [token, dispatch]);

  if (!token) return <Spinner loading />;

  const webPlaybackSdkProps: WebPlaybackProps = {
    playerAutoConnect: true,
    playerInitialVolume: 1.0,
    playerRefreshRateMs: 1000,
    playerName: 'Spotify React Player',
    onPlayerRequestAccessToken: () => Promise.resolve(token!),
    onPlayerLoading: () => {},
    onPlayerWaitingForDevice: () => {
      dispatch(authActions.setPlayerLoaded({ playerLoaded: true }));
      dispatch(authActions.fetchUser());
    },
    onPlayerError: (e) => {
      dispatch(loginToSpotify());
    },
    onPlayerDeviceSelected: () => {
      dispatch(authActions.setPlayerLoaded({ playerLoaded: true }));
    },
  };

  return <WebPlayback {...webPlaybackSdkProps}>{children}</WebPlayback>;
});

const RootComponent = () => {
  const container = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.auth.user);
  const language = useAppSelector((state) => state.language.language);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    i18next.changeLanguage(language);
  }, [language]);

  const routes = [
    { path: '', element: <Home container={container} /> },
    { path: '/playlist/:playlistId', element: <PlaylistView container={container} /> },
    { path: '/album/:albumId', element: <AlbumView container={container} /> },
    { path: '/profile', element: <Profile /> },
    { path: '/browse', element: <BrowsePage /> },
    { path: '/genre/:genreId', element: <GenrePage /> },
    { path: '/search/:search', element: <SearchPage /> },
    { path: '*', element: <Page404 /> },
  ] as const;

  return (
    <Spinner loading={!user}>
      <Router>
        <AppLayout>
          <div className='Main-section' ref={container}>
            <div style={{ minHeight: 'calc(100vh - 230px)', width: '100%' }}>
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<Suspense>{route.element}</Suspense>}
                  />
                ))}
              </Routes>
            </div>
          </div>
        </AppLayout>
      </Router>
    </Spinner>
  );
};

function App() {
  return (
    <ConfigProvider theme={{ token: { fontFamily: 'SpotifyMixUI' } }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SpotifyContainer>
            <RootComponent />
          </SpotifyContainer>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
