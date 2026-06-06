import axios from '../axios';

/**
 * @description Save one or more episodes to the current user's library.
 */
const saveEpisodes = (ids: string[]) =>
  axios.put('/me/library', { uris: ids.map((id) => `spotify:episode:${id}`) });

export const episodesService = {
  saveEpisodes,
};
