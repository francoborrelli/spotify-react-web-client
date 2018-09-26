export const browseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.categories,
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
    case 'FETCH_MORE_CATEGORIES_SUCCESS':
      let items = [...state.categories.items, ...action.categories];
      return {
        ...state,
        categories: {
          ...state.categories,
          next: action.next,
          items: items
        }
      };

    default:
      return state;
  }
};

export default browseReducer;
