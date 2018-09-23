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
    try {
      const response = await axios.get('/me/playlists');
      dispatch(fetchPlaylistMenuSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchPlaylistMenuError());

      return error;
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

export const updatePlaylist = playlist => {
  return {
    type: 'UPDATE_PLAYLIST',
    playlist
  };
};

export const dispacher = a => {
  return a;
};

export const followPlaylist = () => {
  return async (dispatch, getState) => {
    const id = getState().playlistReducer.playlist.id;
    axios.put(`/playlists/${id}/followers`);
    dispatch(
      dispacher({
        type: 'FOLLOW_PLAYLIST'
      })
    );
  };
};

export const unfollowPlaylist = () => {
  return async (dispatch, getState) => {
    const id = getState().playlistReducer.playlist.id;
    axios.delete(`/playlists/${id}/followers`);
    dispatch(
      dispacher({
        type: 'UNFOLLOW_PLAYLIST'
      })
    );
  };
};

export const fetchPlaylist = id => {
  return async (dispatch, getState) => {
    dispatch(fetchPlaylistPending());

    function onSuccess(playlist) {
      dispatch(fetchPlaylistSuccess(playlist));
      return playlist;
    }
    try {
      const userId = getState().userReducer.user.id;
      const playlist = await axios.get(`/playlists/${id}`);
      const follows = await axios.get(
        `/playlists/${id}/followers/contains?ids=${userId}`
      );
      return onSuccess({
        ...playlist.data,
        follows: follows.data[0],
        mine: userId === playlist.data.owner.id
      });
    } catch (error) {
      dispatch(fetchPlaylistError());
      return error;
    }
  };
};
