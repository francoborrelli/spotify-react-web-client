import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';

// Interfaces
import type { Track } from '../../interfaces/track';
import type { Episode } from '../../interfaces/episode';

export interface QueueState {
  queue: (Track | Episode)[];
}

const initialState: QueueState = {
  queue: [],
};

export const fetchQueue = createAsyncThunk('queue/fetchQueue', async () => {
  const response = await userService.fetchQueue();
  return response.data.queue;
});

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQueue.fulfilled, (state, action) => {
      state.queue = action.payload;
    });
  },
});

export const queueActions = {
  fetchQueue,
  ...queueSlice.actions,
};

export default queueSlice.reducer;
