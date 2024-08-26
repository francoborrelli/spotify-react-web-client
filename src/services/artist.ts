import axios from '../axios';
import type { Artist } from '../interfaces/artist';

/**
 * @description Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
const fetchArtist = (id: string) => axios.get<Artist>(`/artists/${id}`);

export const artistService = {
  fetchArtist,
};
