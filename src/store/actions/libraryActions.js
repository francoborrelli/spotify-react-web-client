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

const filterRepeatedSongs = (keyFn, array) => {
  var ids = [];
  return array.filter(x => {
    var key = keyFn(x),
      isNew = !ids.includes(key);
    if (isNew) ids.push(key);
    return isNew;
  });
};

export const fetchRecentSongs = () => {
  return async dispatch => {
    dispatch(fetchSongsPending());
    try {
      const response = await axios.get('/me/player/recently-played');
      console.log(response.data.items);
      const songs = filterRepeatedSongs(x => x.track.id, response.data.items);
      dispatch(fetchSongsSuccess(songs));
      return songs;
    } catch (error) {
      dispatch(fetchSongsError());
      return error;
    }
  };
};
