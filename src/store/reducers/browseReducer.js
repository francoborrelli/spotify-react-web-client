export const browseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.categories.items,
        fetchCategoriesError: false,
        fetchCategoriesPending: false
      };
    case 'FETCH_CATEGORIES_PENDING':
      return {
        ...state,
        fetchCategoriesPending: true
      };
    case 'FETCH_CATEGORIES_ERROR':
      return {
        ...state,
        fetchCategoriesError: true
      };

    default:
      return state;
  }
};

export default browseReducer;
