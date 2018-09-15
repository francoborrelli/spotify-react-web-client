import axios from '../../axios';

export const fetchCategoriesSuccess = categories => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    categories
  };
};

export const fetchCategoriesError = () => {
  return {
    type: 'FETCH_CATEGORIES_ERROR'
  };
};

export const fetchCategories = accessToken => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  return async dispatch => {
    function onSuccess(categories) {
      dispatch(fetchCategoriesSuccess(categories));
      return categories;
    }
    function onError(error) {
      dispatch(fetchCategoriesError());
      return error;
    }
    try {
      const response = await axios.get('/browse/categories');
      return onSuccess(response.data.categories);
    } catch (error) {
      return onError(error);
    }
  };
};
