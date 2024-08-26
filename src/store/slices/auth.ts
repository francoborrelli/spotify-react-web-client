import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Utils
import axios from '../../axios';
import login from '../../utils/spotify/login';

// Services
import { authService } from '../../services/auth';

// Interfaces
import type { User } from '../../interfaces/user';
import { playerService } from '../../services/player';

const initialState: { token?: string; playerLoaded: boolean; user?: User } = {
  user: undefined,
  playerLoaded: false,
  token: localStorage.getItem('spo-token') || undefined,
};

export const loginToSpotify = createAsyncThunk('auth/loginToSpotify', async () => {
  let token: string | undefined = localStorage.getItem('spo-token') as string;

  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    return { token };
  }

  token = login.getToken();
  if (!token) {
    login.logInWithSpotify();
  }

  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    // localStorage.setItem('spo-token', token);
  }
  return { token };
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await authService.fetchUser();
  playerService.fetchPlaybackState().then();
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
