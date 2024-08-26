import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Utils
import axios from '../../axios';
import login from '../../utils/spotify/login';

// Services
import { authService } from '../../services/auth';

// Interfaces
import type { User } from '../../interfaces/user';
import { getFromLocalStorageWithExpiry } from '../../utils/localstorage';

const initialState: { token?: string; playerLoaded: boolean; user?: User } = {
  user: undefined,
  playerLoaded: false,
  token: getFromLocalStorageWithExpiry('access_token') || undefined,
};

export const loginToSpotify = createAsyncThunk('auth/loginToSpotify', async () => {
  let token: string | undefined = getFromLocalStorageWithExpiry('access_token') as string;

  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return { token };
  }

  token = await login.getToken();

  if (!token) {
    login.logInWithSpotify();
  } else {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }

  return { token };
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await authService.fetchUser();
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const authActions = { ...authSlice.actions, loginToSpotify, fetchUser };

export default authSlice.reducer;
