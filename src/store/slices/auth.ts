import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Utils
import axios from '../../axios';
import login from '../../utils/spotify/login';

// Services
import { authService } from '../../services/auth';

// Interfaces
import type { User } from '../../interfaces/user';
import { getFromLocalStorageWithExpiry } from '../../utils/localstorage';

const initialState: { token?: string; playerLoaded: boolean; user?: User; requesting: boolean } = {
  user: undefined,
  requesting: true,
  playerLoaded: false,
  token: getFromLocalStorageWithExpiry('access_token') || undefined,
};

export const loginToSpotify = createAsyncThunk<{ token?: string; loaded: boolean }, boolean>(
  'auth/loginToSpotify',
  async (anonymous, api) => {
    const userToken: string | undefined = getFromLocalStorageWithExpiry('access_token') as string;
    const anonymousToken: string | undefined = getFromLocalStorageWithExpiry('public_access_token');

    let token = userToken || anonymousToken;

    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      if (userToken) api.dispatch(fetchUser());
      return { token, loaded: false };
    }

    let [requestedToken, requestUser] = await login.getToken();
    if (requestUser) api.dispatch(fetchUser());

    if (!requestedToken) {
      login.logInWithSpotify(anonymous);
    } else {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + requestedToken;
    }

    return { token: requestedToken, loaded: true };
  }
);

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await authService.fetchUser();
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRequesting(state, action: PayloadAction<{ requesting: boolean }>) {
      state.requesting = action.payload.requesting;
    },
    setToken(state, action: PayloadAction<{ token?: string }>) {
      state.token = action.payload.token;
    },
    setPlayerLoaded(state, action: PayloadAction<{ playerLoaded: boolean }>) {
      state.playerLoaded = action.payload.playerLoaded;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginToSpotify.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.requesting = !action.payload.loaded;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.requesting = false;
    });
  },
});

export const authActions = { ...authSlice.actions, loginToSpotify, fetchUser };

export default authSlice.reducer;
