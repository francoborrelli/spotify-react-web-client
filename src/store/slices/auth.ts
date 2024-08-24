import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Utils
import axios from '../../axios';
import login from '../../utils/spotify/login';

const initialState: { token?: string; playerLoaded: boolean } = {
  token: localStorage.getItem('spo-token') || undefined,
  playerLoaded: false,
};

export const loginToSpotify = createAsyncThunk('entidad/fetchEntidadStatus', async () => {
  let token: string | undefined = localStorage.getItem('spo-token') as string;
  if (token) return { token };
  token = login.getToken();
  if (!token) {
    login.logInWithSpotify();
  }

  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    localStorage.setItem('spo-token', token);
  }
  return { token };
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
  },
});

export const authActions = { ...authSlice.actions, loginToSpotify };

export default authSlice.reducer;
