import { ReactNode } from 'react';
import { AlbumCard, PlaylistCard } from './VerticalCard';

// Interfaces
import type { Album } from '../../../interfaces/albums';
import type { Playlist } from '../../../interfaces/playlists';

type Item = Album | Playlist;

export function ItemsList(props: {
  title: string;
  items: Item[];
  chips?: ReactNode;
  getDescription?: (item: Item) => string;
}) {
  const { items, getDescription, chips, title } = props;
  return (
    <div>
      <h1 className='playlist-header'>{title}</h1>
      {chips}
      <div className='playlist-grid'>
        {items.map((item) => {
          return (
            <div key={item.id}>
              {item.type === 'album' ? (
                <AlbumCard item={item} getDescription={getDescription} />
              ) : null}
              {item.type === 'playlist' ? (
                <PlaylistCard item={item} getDescription={getDescription} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
