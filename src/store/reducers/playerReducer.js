export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_STATUS_SUCCESS':
      return {
        ...state,
        status: action.status
      };
    case 'PAUSE_STATE':
      return {
        ...state,
        status: { ...state.status, is_playing: false }
      };
    case 'PLAY_STATE':
      return {
        ...state,
        status: { ...state.status, is_playing: true }
      };

    default:
      return state;
  }
};

export default playerReducer;
