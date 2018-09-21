import axios from '../../axios';

export const fetchSongsPending = () => {
  return {
    type: 'FETCH_SONGS_PENDING'
  };
};

export const fetchSongsSuccess = songs => {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    songs
  };
};

export const fetchSongsError = () => {
  return {
    type: 'FETCH_SONGS_ERROR'
  };
};

export const fetchSongs = () => {
  return async dispatch => {
    dispatch(fetchSongsPending());
    try {
      const response = await axios.get('/me/tracks?limit=50');
      dispatch(fetchSongsSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchSongsError());
      return error;
    }
  };
};

export const fetchRecentSongs = () => {
  return async dispatch => {
    dispatch(fetchSongsPending());
    try {
      const response = await axios.get('/me/player/recently-played');
      dispatch(fetchSongsSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchSongsError());
      return error;
    }
  };
};
