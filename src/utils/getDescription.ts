import { Album } from '../interfaces/albums';
import { Playlist } from '../interfaces/playlists';

export const getPlaylistDescription = (item: Playlist | Album) => {
  if (item.type === 'playlist') {
    const html = item.description || '';
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  return '';
};
