const initialState = {
  user: {
    id: null,
    display_name: null
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: action.user,
        fetchUserError: false
      };

    case 'FETCH_USER_ERROR':
      return {
        ...state,
        fetchUserError: true
      };

    default:
      return state;
  }
};

export default userReducer;
