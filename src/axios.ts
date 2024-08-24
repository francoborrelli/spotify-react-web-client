import Axios from 'axios';

const path = 'https://api.spotify.com/v1';

const axios = Axios.create({
  baseURL: path,
  headers: {},
});

export default axios;
