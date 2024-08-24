import './styles/App.scss';

// Utils
import i18next from 'i18next';
import { Suspense, lazy, useEffect, useRef } from 'react';

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
import WebPlayback, { WebPlaybackProps } from './utils/spotify/webPlayback';
import login from './utils/spotify/login';
import { authActions, loginToSpotify } from './store/slices/auth';

// Pages
const Home = lazy(() => import('./pages/Home'));
const Page404 = lazy(() => import('./pages/404'));
const Profile = lazy(() => import('./pages/Profile'));
const PlaylistView = lazy(() => import('./pages/Playlist'));

window.addEventListener('resize', () => {
  const vh = window.innerWidth;
  if (vh < 950) {
    store.dispatch(libraryActions.collapseLibrary());
  }
});

const RootComponent = () => {
  const dispatch = useAppDispatch();
  const container = useRef<HTMLDivElement>(null);
  const token = useAppSelector((state) => state.auth.token);
  const language = useAppSelector((state) => state.language.language);

  useEffect(() => {
    dispatch(loginToSpotify());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    i18next.changeLanguage(language);
  }, [language]);

  const routes = [
    { path: '', element: <Home /> },
    { path: '/profile', element: <Profile /> },
    { path: '/search/:search', element: <SearchPage /> },
    { path: '/playlist/:playlistId', element: <PlaylistView container={container} /> },
    { path: '*', element: <Page404 /> },
  ] as const;

  const webPlaybackSdkProps: WebPlaybackProps = {
    playerName: 'Spotify React Player',
    playerInitialVolume: 1.0,
    playerRefreshRateMs: 1000,
    playerAutoConnect: true,
    onPlayerRequestAccessToken: () => Promise.resolve(token!),
    onPlayerLoading: () => {},
    onPlayerWaitingForDevice: () => {
      dispatch(authActions.setPlayerLoaded({ playerLoaded: true }));
    },
    onPlayerError: (e) => {
      console.log(e);
    },
    onPlayerDeviceSelected: () => {
      dispatch(authActions.setPlayerLoaded({ playerLoaded: true }));
    },
  };

  return (
    <WebPlayback {...webPlaybackSdkProps}>
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
    </WebPlayback>
  );
};

function App() {
  return (
    <ConfigProvider theme={{ token: { fontFamily: 'SpotifyMixUI' } }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootComponent />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
