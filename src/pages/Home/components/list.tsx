import { FC } from 'react';
import { AlbumCard, PlaylistCard } from './VerticalCard';

// Interfaces
import type { Album } from '../../../interfaces/albums';
import type { Playlist } from '../../../interfaces/playlists';

export const ItemsList: FC<{ title: string; items: Album[] | Playlist[] }> = (props) => {
  const { items } = props;

  return (
    <div>
      <h1 className='playlist-header'>{props.title}</h1>
      <div className='playlist-grid'>
        {items.map((item) => {
          return (
            <div key={item.id}>
              {item.type === 'album' ? <AlbumCard item={item} /> : null}
              {item.type === 'playlist' ? <PlaylistCard item={item} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
