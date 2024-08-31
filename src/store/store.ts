import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Reducers
import uiReducer from './slices/ui';
import authReducer from './slices/auth';
import homeReducer from './slices/home';
import albumReducer from './slices/album';
import queueReducer from './slices/queue';
import genreReducer from './slices/genre';
import searchReducer from './slices/search';
import browseReducer from './slices/browse';
import artistReducer from './slices/artist';
import profileReducer from './slices/profile';
import spotifyReducer from './slices/spotify';
import languageReducer from './slices/language';
import playlistReducer from './slices/playlist';
import likedSongsReducer from './slices/likedSongs';
import playingNowReducer from './slices/playingNow';
import yourLibraryReducer from './slices/yourLibrary';
import searchHistoryReducer from './slices/searchHistory';
import artistDiscographyReducer from './slices/discography';
import editPlaylistModalReducer from './slices/editPlaylistModal';
import expireReducer from 'redux-persist-expire';

const appReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  home: homeReducer,
  album: albumReducer,
  queue: queueReducer,
  genre: genreReducer,
  search: searchReducer,
  artist: artistReducer,
  browse: browseReducer,
  profile: profileReducer,
  spotify: spotifyReducer,
  language: languageReducer,
  playlist: playlistReducer,
  playingNow: playingNowReducer,
  likedSongs: likedSongsReducer,
  yourLibrary: yourLibraryReducer,
  searchHistory: searchHistoryReducer,
  artistDiscography: artistDiscographyReducer,
  editPlaylistModal: editPlaylistModalReducer,
});

// @ts-ignore
const rootReducer = (state, action) => {
  if (action.type === 'auth/removeUser') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const whitelist = ['language', 'ui', 'searchHistory'] as string[];

const persistedReducer = persistReducer(
  {
    storage,
    whitelist,
    key: 'root',
    transforms: [expireReducer('searchHistory', { expireSeconds: 60 * 60 * 24 })],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['spotify.player'],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
