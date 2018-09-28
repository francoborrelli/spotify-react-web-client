import axios from '../../axios';

const fetchDataPending = () => {
  return {
    type: 'FETCH_DATA_PENDING'
  };
};

const fetchDataSuccess = data => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    data
  };
};

const fetchDataError = () => {
  return {
    type: 'FETCH_DATA_ERROR'
  };
};

export const setQuery = query => {
  return {
    type: 'SET_QUERY',
    query
  };
};

export const fetchSearchData = query => {
  return async (dispatch, getState) => {
    dispatch(setQuery(query));
    if (!query) {
      return;
    }
    dispatch(fetchDataPending());
    const country = getState().userReducer.user.country;
    try {
      const response = await axios.get(
        `/search?q=${query}&type=artist,album,playlist,track&market=${country}&limit=6`
      );
      dispatch(fetchDataSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchDataError());
      return error;
    }
  };
};
