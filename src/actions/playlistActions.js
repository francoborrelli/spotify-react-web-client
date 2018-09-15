import axios from '../axios';

export const fetchPlaylistMenuPending = () => {
  return {
    type: 'FETCH_PLAYLIST_MENU_PENDING'
  };
};

export const fetchPlaylistMenuSuccess = playlists => {
  return {
    type: 'FETCH_PLAYLIST_MENU_SUCCESS',
    playlists
  };
};

export const fetchPlaylistMenuError = () => {
  return {
    type: 'FETCH_PLAYLIST_MENU_ERROR'
  };
};

export const fetchPlaylistsMenu = accessToken => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  return async dispatch => {
    dispatch(fetchPlaylistMenuPending());

    function onSuccess(playlists) {
      dispatch(fetchPlaylistMenuSuccess(playlists));
      return playlists;
    }
    function onError(error) {
      dispatch(fetchPlaylistMenuError());
      return error;
    }
    try {
      const response = await axios.get('/me/playlists');
      return onSuccess(response.data);
    } catch (error) {
      return onError(error);
    }
  };
};
