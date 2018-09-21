import axios from '../../axios';

export const fetchPlayerStatus = () => {
  return async dispatch => {
    const status = await axios.get('/me/player');
    dispatch(fetchStatusSuccess(status.data));
    return status.data;
  };
};

export const fetchStatusSuccess = status => {
  return {
    type: 'FETCH_STATUS_SUCCESS',
    status
  };
};

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

export const playSong = () => {
  axios.put('/me/player/play');
  return {
    type: 'PLAY_STATE'
  };
};

export const pauseSong = () => {
  axios.put('/me/player/pause');
  return {
    type: 'PAUSE_STATE'
  };
};
