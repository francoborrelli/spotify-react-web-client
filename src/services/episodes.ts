import axios from '../axios';

/**
 * @description Save one or more episodes to the current user's library.
 */
const saveEpisodes = (ids: string[]) =>
  axios.put('/me/episodes', null, { params: { ids: ids.join(',') } });

export const episodesService = {
  saveEpisodes,
};
