import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { AlbumCard, ArtistCard, PlaylistCard } from './GridCards';

// Utils
import { useTranslation } from 'react-i18next';

// Interfaces
import type { ReactNode } from 'react';
import type { Album } from '../../interfaces/albums';
import type { Artist } from '../../interfaces/artist';
import type { Playlist } from '../../interfaces/playlists';

type Item = Album | Playlist | Artist;

export function GridItemComponent(props: { item: Item; getDescription?: (item: Item) => string }) {
  const { item, getDescription } = props;
  if (item.type === 'album') {
    return <AlbumCard item={item} getDescription={getDescription} />;
  }

  if (item.type === 'playlist') {
    return <PlaylistCard item={item} getDescription={getDescription} />;
  }

  if (item.type === 'artist') {
    return <ArtistCard item={item} getDescription={getDescription} />;
  }

  return null;
}

export function GridItemList(props: {
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
              <GridItemComponent item={item} getDescription={getDescription} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
