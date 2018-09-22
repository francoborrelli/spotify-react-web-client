const initialState = {
  view: 'browse'
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NEW_VIEW':
      return {
        ...state,
        view: action.view,
        id: action.id
      };

    default:
      return state;
  }
};

export default uiReducer;
