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

// --- Global concurrency limiter --------------------------------------------------------------
// Several screens (Home, Artist) fan out many requests at once, and dev StrictMode doubles
// them. Spotify's tightened Feb-2026 rate limits 429 on those bursts. Cap how many requests are
// in flight at once so traffic is smoothed instead of bursted; the rest queue and drain as
// slots free up. Combined with the 429 backoff below, this keeps the app under the limit.
const MAX_CONCURRENT = 3;
let activeRequests = 0;
const waiters: Array<() => void> = [];

const acquireSlot = () =>
  new Promise<void>((resolve) => {
    if (activeRequests < MAX_CONCURRENT) {
      activeRequests++;
      resolve();
    } else {
      waiters.push(() => {
        activeRequests++;
        resolve();
      });
    }
  });

const releaseSlot = () => {
  activeRequests = Math.max(0, activeRequests - 1);
  waiters.shift()?.();
};

axios.interceptors.request.use(async (config) => {
  await acquireSlot();
  return config;
});

axios.interceptors.response.use(
  (response) => {
    releaseSlot();
    return response;
  },
  async (error) => {
    // Release this attempt's slot first so a retry (and other queued requests) can proceed.
    releaseSlot();

    const response = error?.response;
    const config = error?.config;

    // Network error / no response — nothing to recover from.
    if (!response || !config) return Promise.reject(error);

    if (response.status === 401) {
      return getRefreshToken()
        .then((token) => {
          if (!token) return Promise.reject(error);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          config.headers['Authorization'] = 'Bearer ' + token;
          return axios(config);
        })
        .catch(() => {
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('access_token');
        });
    }

    // 429 Too Many Requests: Spotify's tightened (Feb 2026) rate limits are easy to trip when
    // a page fires a burst of calls (and dev StrictMode doubles them). Back off for the
    // server-specified `Retry-After`, then retry — bounded so we never loop forever.
    if (response.status === 429) {
      config.__retryCount = (config.__retryCount || 0) + 1;
      // Only one retry: during a global cooldown, re-issuing many times just adds load and
      // prolongs the penalty window.
      if (config.__retryCount > 1) return Promise.reject(error);
      const retryAfter = Number(response.headers?.['retry-after']);
      const waitMs = Math.min((Number.isFinite(retryAfter) ? retryAfter : 1) * 1000, 10000);
      await new Promise((resolve) => setTimeout(resolve, Math.max(waitMs, 500)));
      return axios(config);
    }

    return Promise.reject(error);
  }
);

export default axios;
