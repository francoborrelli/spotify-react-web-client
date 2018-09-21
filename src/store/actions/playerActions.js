import axios from '../../axios';

export const fetchCurrentSongSuccess = song => {
  return {
    type: 'FETCH_SONG_SUCCESS',
    song,
    playing: true
  };
};

export const fetchCurrentSongError = () => {
  return {
    type: 'FETCH_SONG_ERROR'
  };
};

export const fetchCurrentSong = () => {
  return async dispatch => {
    try {
      const song = await axios.get('/me/player/currently-playing');
      dispatch(fetchCurrentSongSuccess(song.data.item));
      return song.data.item;
    } catch (error) {
      dispatch(fetchCurrentSongError());
      return error;
    }
  };
};

export const nextSong = () => {
  return async dispatch => {
    await axios
      .post('/me/player/next')
      .then(() => dispatch(fetchCurrentSong()));
    dispatch(fetchCurrentSong());
  };
};

export const previousSong = () => {
  return async dispatch => {
    axios.post('/me/player/previous').then(() => dispatch(fetchCurrentSong()));
  };
};

export const pauseSong = () => {
  axios.post('/me/player/pause');
  return {
    type: 'PAUSE_STATE'
  };
};
