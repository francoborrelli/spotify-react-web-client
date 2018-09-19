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

const fetchCategories = path => {
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
      const response = await axios.get(`/browse/${path}`);
      return onSuccess(
        response.data.categories ||
          response.data.playlists ||
          response.data.albums
      );
    } catch (error) {
      return onError(error);
    }
  };
};

export const fetchGenres = () => {
  return async dispatch => {
    dispatch(fetchCategories('categories'));
  };
};

export const fetchNewReleases = () => {
  return async dispatch => {
    dispatch(fetchCategories('new-releases'));
  };
};

export const fetchFeatured = () => {
  return async dispatch => {
    dispatch(fetchCategories('featured-playlists'));
  };
};
