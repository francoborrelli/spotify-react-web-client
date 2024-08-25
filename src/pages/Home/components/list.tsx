import { FC } from 'react';
import { AlbumCard } from './VerticalCard';

// Utils
import { useNavigate } from 'react-router-dom';

// Interfaces
import type { Album } from '../../../interfaces/albums';

export const ItemsList: FC<{ title: string; items: Album[] }> = (props) => {
  const { items } = props;
  const navigate = useNavigate();

  return (
    <div>
      <h1 className='playlist-header'>{props.title}</h1>
      <div className='playlist-grid'>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <AlbumCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
