import {
  mute,
  onLoop,
  onRemoveLoop,
  pauseAudio,
  play,
  setPlayerVolume,
  startAudio,
} from '../../player';

// Constants
import { AVAILABLE_SONGS } from '../../constants/songs';
import { INITIAL_VOLUME } from '../../constants/player';

// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  muted: boolean;
  volume: number;
  looping: boolean;
  playing: boolean;
  currentSong: number;
  duration: number;
  currentTime: number;
} = {
  looping: false,
  muted: false,
  currentSong: 0,
  playing: false,
  duration: 0,
  currentTime: 0,
  volume: INITIAL_VOLUME,
};

const playingBarSlice = createSlice({
  name: 'playingBar',
  initialState,
  reducers: {
    toggleLooping(state) {
      state.looping = !state.looping;
      if (state.looping) {
        onLoop();
      } else {
        onRemoveLoop();
      }
    },
    setPlaying(state) {
      state.playing = true;
      startAudio();
      if (!state.duration) {
        state.duration = 118.93551;
      }
      setPlayerVolume(state.volume);
    },
    setPause(state) {
      state.playing = false;
      pauseAudio();
    },
    setTime(state, action: PayloadAction<{ time: number }>) {
      if (!state.duration) return;
      state.currentTime = action.payload.time;
      if (!state.playing) {
        startAudio();
        state.playing = true;
      }
    },
    increaseTime(state) {
      state.currentTime += 0.5;
      if (state.currentTime >= state.duration) {
        state.currentTime = 0;
      }
    },
    nextSong(state) {
      state.currentTime = 0;
      state.currentSong++;
      if (state.currentSong >= AVAILABLE_SONGS.length) {
        state.currentSong = 0;
      }
      state.playing = true;
      play(state.currentSong, state.volume);
    },
    setSong(state, action: PayloadAction<{ song: number }>) {
      state.currentTime = 0;
      state.currentSong = action.payload.song;
      state.playing = true;
      play(action.payload.song, state.volume);
    },
    previousSong(state) {
      state.currentTime = 0;
      state.currentSong--;
      if (state.currentSong < 0) {
        state.currentSong = AVAILABLE_SONGS.length - 1;
      }
      state.playing = true;
      play(state.currentSong, state.volume);
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
      state.currentTime = 0;
    },
    setVolume(state, action: PayloadAction<{ volume: number }>) {
      state.volume = action.payload.volume;
      if (action.payload.volume === 0) {
        state.muted = true;
        mute();
      } else {
        state.muted = false;
        setPlayerVolume(action.payload.volume);
      }
    },
  },
});

export const getCurrentSongData = (state: { playingBar: typeof initialState }) => {
  return AVAILABLE_SONGS[state.playingBar.currentSong];
};

export const getQueue = (state: { playingBar: typeof initialState }) => {
  const { currentSong } = state.playingBar;
  const queue = [
    ...AVAILABLE_SONGS.slice(currentSong + 1),
    ...AVAILABLE_SONGS.slice(0, currentSong),
  ];
  return queue;
};

export const playingBarActions = playingBarSlice.actions;

export default playingBarSlice.reducer;
