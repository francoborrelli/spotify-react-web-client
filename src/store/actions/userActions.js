import axios from '../../axios';

export const fetchUserSuccess = user => {
  return {
    type: 'FETCH_USER_SUCCESS',
    user
  };
};

export const fetchUserError = () => {
  return {
    type: 'FETCH_USER_ERROR'
  };
};

export const fetchUser = accessToken => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  return async dispatch => {
    function onSuccess(user) {
      dispatch(fetchUserSuccess(user));
      return user;
    }
    function onError(error) {
      dispatch(fetchUserError());
      return error;
    }
    try {
      const response = await axios.get('/me');
      return onSuccess(response.data);
    } catch (error) {
      return onError(error);
    }
  };
};
