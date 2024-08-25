export const secondsToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${Math.round(remainingSeconds)}`;
};

export const msToTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  return secondsToTime(seconds);
};
