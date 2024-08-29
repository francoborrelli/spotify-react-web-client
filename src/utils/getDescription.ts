import { Album } from '../interfaces/albums';
import { Playlist } from '../interfaces/playlists';

export const removeHtmlTags = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export const getPlaylistDescription = (item: Playlist | Album) => {
  if (item.type === 'playlist') {
    return removeHtmlTags(item.description || '');
  }
  return '';
};
