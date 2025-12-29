const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_ID;

// PKCE utility functions
function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}

export default {
  logInWithSpotify: async () => {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    let scopes = [
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
    ].join(' ');

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
      client_id: client_id,
      response_type: 'code',
      redirect_uri: redirect_uri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      scope: scopes,
      show_dialog: 'true',
    });

    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  },

  getToken: () => {
    return window.localStorage.getItem('access_token');
  },

  refreshToken: async () => {
    const refreshToken = window.localStorage.getItem('refresh_token');

    if (!refreshToken) {
      return null;
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: client_id,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      window.localStorage.setItem('access_token', data.access_token);
      // Refresh token might be renewed
      if (data.refresh_token) {
        window.localStorage.setItem('refresh_token', data.refresh_token);
      }
    }

    return data;
  },

  handleCallback: async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const codeVerifier = window.localStorage.getItem('code_verifier');

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: client_id,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirect_uri,
          code_verifier: codeVerifier,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        // Store tokens
        window.localStorage.setItem('access_token', data.access_token);
        window.localStorage.setItem('refresh_token', data.refresh_token);
        // Remove code verifier as it's no longer needed
        window.localStorage.removeItem('code_verifier');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return true;
      }
    }
    return false;
  },

  logout: () => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('code_verifier');
  },
};
