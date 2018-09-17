import axios from '../../axios';

export const fetchArtistPending = () => {
  return {
    type: 'FETCH_ARTIST_PENDING'
  };
};

export const fetchArtistSuccess = artist => {
  return {
    type: 'FETCH_ARTIST_SUCCESS',
    artist
  };
};

export const fetchArtistError = () => {
  return {
    type: 'FETCH_ARTIST_ERROR'
  };
};

export const fetchArtist = (accessToken, id) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  return async dispatch => {
    dispatch(fetchArtistPending());

    function onSuccess(artist) {
      dispatch(fetchArtistSuccess(artist));
      return artist;
    }
    function onError(error) {
      dispatch(fetchArtistError());
      return error;
    }
    try {
      const response = await axios.get(`/artists/${id}`);
      return onSuccess(response.data);
    } catch (error) {
      return onError(error);
    }
  };
};
