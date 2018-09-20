import axios from '../../axios';

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

export const fetchPlaylistsMenu = () => {
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

export const fetchPlaylistPending = () => {
  return {
    type: 'FETCH_PLAYLIST_PENDING'
  };
};

export const fetchPlaylistSuccess = playlist => {
  return {
    type: 'FETCH_PLAYLIST_SUCCESS',
    playlist
  };
};

export const fetchPlaylistError = () => {
  return {
    type: 'FETCH_PLAYLIST_ERROR'
  };
};

export const fetchPlaylist = id => {
  return async (dispatch, getState) => {
    dispatch(fetchPlaylistPending());

    function onSuccess(playlist) {
      dispatch(fetchPlaylistSuccess(playlist));
      return playlist;
    }
    function onError(error) {
      dispatch(fetchPlaylistError());
      return error;
    }
    try {
      const userId = getState().userReducer.user.id;
      const playlist = await axios.get(`/playlists/${id}`);
      const follows = await axios.get(
        `/playlists/${id}/followers/contains?ids=${userId}`
      );
      return onSuccess({ ...playlist.data, follows: follows.data[0] });
    } catch (error) {
      return onError(error);
    }
  };
};
