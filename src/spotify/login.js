const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_ID;

export default {
  logInWithSpotify: () => {
    let scopes = [
      'streaming',
      'user-read-private',
      'user-read-birthdate',
      'user-read-email',
      'user-read-recently-played',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-library-modify',
      'user-follow-modify',
      'playlist-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-top-read'
    ].join(' ');

    let scopes_encoded = scopes.replace(' ', '%20');

    window.location = [
      'https://accounts.spotify.com/authorize',
      `?client_id=${client_id}`,
      `&redirect_uri=${redirect_uri}`,
      `&scope=${scopes_encoded}`,
      '&response_type=token',
      '&show_dialog=true'
    ].join('');
  },

  getToken: () => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    window.location.hash = '';
    return hashParams.access_token;
  }
};
