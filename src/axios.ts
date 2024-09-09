import Axios from 'axios';
import { getRefreshToken } from './utils/spotify/login';
import { getFromLocalStorageWithExpiry } from './utils/localstorage';

const path = 'https://api.spotify.com/v1' as const;

const access_token = getFromLocalStorageWithExpiry('access_token') as string;

const axios = Axios.create({
  baseURL: path,
  headers: {},
});

if (access_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return getRefreshToken()
        .then((token) => {
          if (!token) return Promise.reject(error);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          error.config.headers['Authorization'] = 'Bearer ' + token;
          return axios(error.config);
        })
        .catch(() => {
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('access_token');
        });
    }
    return Promise.reject(error);
  }
);

export default axios;
