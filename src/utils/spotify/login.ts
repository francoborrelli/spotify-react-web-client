const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_ID;

const SCOPES = [
  'streaming',
  'user-read-private',
  'user-read-email',
  'playlist-modify-public',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-library-modify',
  'user-follow-modify',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-read-playback-position',
  'user-top-read',
  'user-follow-modify',
  'user-follow-read',
] as const;

const logInWithSpotify = () => {
  const scopes = SCOPES.join(' ');
  const scopes_encoded = scopes.replace(' ', '%20');
  const url = [
    'https://accounts.spotify.com/authorize',
    `?client_id=${client_id}`,
    `&redirect_uri=${redirect_uri}`,
    `&scope=${scopes_encoded}`,
    '&response_type=token',
    '&show_dialog=true',
  ].join('');
  window.location.href = url;
};

const getToken = () => {
  const hashParams: Record<string, string | undefined> = {};
  let e: string[] | null,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  window.location.hash = '';
  return hashParams.access_token;
};

export default { logInWithSpotify, getToken };
