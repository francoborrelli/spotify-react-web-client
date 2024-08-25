import Axios from 'axios';

const path = 'https://api.spotify.com/v1' as const;

const axios = Axios.create({
  baseURL: path,
  headers: {},
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('spo-token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axios;
