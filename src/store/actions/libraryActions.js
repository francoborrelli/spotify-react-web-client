import axios from '../../axios';

const fetchSongsPending = () => {
  return {
    type: 'FETCH_SONGS_PENDING'
  };
};

const fetchSongsSuccess = songs => {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    songs
  };
};

const fetchMoreSucess = (songs, next) => {
  return {
    type: 'FETCH_MORE_SONGS_SUCCESS',
    songs,
    next
  };
};

const fetchSongsError = () => {
  return {
    type: 'FETCH_SONGS_ERROR'
  };
};

const containsSongSuccess = contains => {
  return {
    type: 'CONTAINS_CURRENT_SUCCESS',
    contains: contains
  };
};

export const removeSong = (id, current = false) => {
  axios.delete(`/me/tracks?ids=${id}`);
  return {
    type: 'REMOVE_SONG_SUCCESS',
    current: current
  };
};

export const addSong = (id, current = false) => {
  axios.put(`/me/tracks?ids=${id}`);
  return {
    type: 'ADD_SONG_SUCCESS',
    current: current
  };
};

export const containsCurrentSong = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/me/tracks/contains?ids=${id}`);
      dispatch(containsSongSuccess(response, true));
      return response.data;
    } catch (error) {
      return error;
    }
  };
};

export const containsSong = id => {
  return async () => {
    try {
      const response = await axios.get(`/me/tracks/contains?ids=${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };
};

export const fetchSongs = () => {
  return async dispatch => {
    dispatch(fetchSongsPending());
    try {
      const response = await axios.get('/me/tracks?limit=25');
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

export const fetchMoreSongs = () => {
  return async (dispatch, getState) => {
    const next = getState().libraryReducer.songs.next;
    try {
      if (next) {
        const response = await axios.get(next);
        const songs = await filterRepeatedSongs(
          x => x.track.id,
          response.data.items
        );
        dispatch(fetchMoreSucess(songs, response.data.next));
        return songs;
      }
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
      const songs = await filterRepeatedSongs(
        x => x.track.id,
        response.data.items
      );
      dispatch(fetchSongsSuccess({ ...response.data, items: songs }));
      return songs;
    } catch (error) {
      dispatch(fetchSongsError());
      return error;
    }
  };
};
