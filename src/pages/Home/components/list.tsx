import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { AlbumCard, ArtistCard, PlaylistCard } from './VerticalCard';

// Utils
import { useTranslation } from 'react-i18next';

// Interfaces
import type { ReactNode } from 'react';
import type { Album } from '../../../interfaces/albums';
import type { Artist } from '../../../interfaces/artist';
import type { Playlist } from '../../../interfaces/playlists';

type Item = Album | Playlist | Artist;

export function ItemsList(props: {
  title?: string;
  items: Item[];
  moreUrl?: string;
  chips?: ReactNode;
  getDescription?: (item: Item) => string;
}) {
  const [t] = useTranslation(['artist']);
  const { items, getDescription, chips, title, moreUrl } = props;
  return (
    <div>
      <Flex justify='space-between' align='center'>
        {title ? (
          moreUrl ? (
            <Link to={moreUrl} style={{ textDecoration: 'none' }}>
              <h1 className='playlist-header'>{title}</h1>
            </Link>
          ) : (
            <h1 className='playlist-header'>{title}</h1>
          )
        ) : null}

        {moreUrl ? (
          <Link className='mobile-hidden' to={moreUrl}>
            <button className='showMore'>
              <span>{t('Show more')}</span>
            </button>
          </Link>
        ) : null}
      </Flex>

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

              {item.type === 'artist' ? (
                <ArtistCard item={item} getDescription={getDescription} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
