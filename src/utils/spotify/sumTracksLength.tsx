import type { Track } from '../../interfaces/track';

// function that sums tracks length and return duration in minutes and seconds
export const sumTracksLength = (tracks: Track[]): string => {
  const totalDuration = tracks.reduce((acc, track) => acc + track.duration_ms, 0);
  const minutes = Math.floor(totalDuration / 60000);
  const seconds = Math.floor((totalDuration % 60000) / 1000);
  return `${minutes} min ${seconds} sec`;
};
