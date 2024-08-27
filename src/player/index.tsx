import { store } from '../store/store';

export const pauseAudio = () => {
  // @ts-ignore
  // AudioPlayer?.pause();
};

export const startAudio = () => {
  // @ts-ignore
  // AudioPlayer.play();
};

export const mute = () => {
  // AudioPlayer.muted = true;
};

export const unmute = () => {
  // AudioPlayer.muted = false;
};

export const setPlayerVolume = (volume: number) => {
  // AudioPlayer.volume = volume;
};

export const getCurrentDuration = () => {
  // return AudioPlayer.duration;
};

export const play = (index: number, volume?: number) => {
  // AudioPlayer.src = getSongPath(AVAILABLE_SONGS[index].file);
  // if (volume) {
  //   AudioPlayer.volume = volume;
  // }
  // // @ts-ignore
  // AudioPlayer.play();
};

// AudioPlayer?.ondurationchange = (e) => {
//   // @ts-ignore
//   const value = e.target.duration;

//   // if not nan
//   if (value) {
//     store.dispatch({ type: 'playingBar/setDuration', payload: value });
//   }
// };

const onPlayNext = () => {
  store.dispatch({ type: 'playingBar/nextSong' });
};

// @ts-ignore
// AudioPlayer.addEventListener('ended', onPlayNext);

export const onLoop = () => {
  // AudioPlayer.loop = true;
  // @ts-ignore
  AudioPlayer.removeEventListener('ended', onPlayNext);
};

export const onRemoveLoop = () => {
  // AudioPlayer.loop = false;
  // // @ts-ignore
  // AudioPlayer.addEventListener('ended', onPlayNext);
};

export const setCurrentTimeForPlayer = (value: number) => {
  // AudioPlayer.currentTime = value;
};
