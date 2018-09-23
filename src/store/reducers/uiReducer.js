const initialState = {
  view: 'browse',
  modal: false
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NEW_VIEW':
      return {
        ...state,
        view: action.view
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: action.modal,
        mode: action.mode
      };
    default:
      return state;
  }
};

export default uiReducer;
