import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import playlistReducer from './playlistReducer';
import browseReducer from './browseReducer';

export default combineReducers({
  tokenReducer,
  userReducer,
  playlistReducer,
  browseReducer
});
