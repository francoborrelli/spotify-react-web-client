import axios from 'axios';

const path = 'https://api.spotify.com/v1';

const instance = axios.create({
  baseURL: path,
  headers: {}
});

export default instance;
