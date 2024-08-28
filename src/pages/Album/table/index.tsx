import SongView from './SongView';
import { AlbumControls } from '../controls';

// Interfaces
import { memo, type FC } from 'react';
import { PlaylistTableHeader } from './header';
import { useAppSelector } from '../../../store/store';
import { OtherAlbums } from '../otherAlbums';

interface PlaylistListProps {
  color: string;
}

export const AlbumList: FC<PlaylistListProps> = memo(({ color }) => {
  const tracks = useAppSelector((state) => state.album.tracks);

  return (
    <div
      className='playlist-list'
      style={{
        maxHeight: 323,
        background: `linear-gradient(${color} -50%, #121212 90%)`,
      }}
    >
      <AlbumControls />
      <div className='playlist-table'>
        <PlaylistTableHeader />
      </div>

      <div style={{ paddingBottom: 30 }}>
        {tracks.map((song, index) => (
          <SongView song={song} key={song.id} index={index} />
        ))}
      </div>

      <div style={{ paddingBottom: 30 }}>
        <OtherAlbums />
      </div>
    </div>
  );
});
