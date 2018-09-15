import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import playlistReducer from './playlistReducer';

export default combineReducers({
  tokenReducer,
  userReducer,
  playlistReducer
});
