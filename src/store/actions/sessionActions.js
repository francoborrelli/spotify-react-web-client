import axios from '../../axios';

export const setToken = token => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  return {
    type: 'SET_TOKEN',
    token
  };
};

export const setDeviceId = id => {
  return {
    type: 'SET_DEVICE_ID',
    id
  };
};
