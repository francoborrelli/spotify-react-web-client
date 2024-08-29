import type { Album } from '../interfaces/albums';
import type { Artist } from '../interfaces/artist';
import type { Playlist } from '../interfaces/playlists';

export const removeHtmlTags = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export const getPlaylistDescription = (item: Playlist | Album | Artist) => {
  if (item.type === 'playlist') {
    return removeHtmlTags(item.description || '');
  }
  return '';
};

export const getAlbumDescription = (item: Playlist | Album | Artist) => {
  if (item.type === 'album') {
    const year = item.release_date.split('-')[0];
    const type = item.album_type === 'album' ? 'Album' : 'Single';
    return `${year} • ${type}`;
  }
  return '';
};
