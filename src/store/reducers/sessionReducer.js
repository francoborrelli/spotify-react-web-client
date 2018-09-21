export const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'SET_DEVICE_ID':
      return {
        ...state,
        deviceId: action.id
      };
    default:
      return state;
  }
};

export default sessionReducer;
