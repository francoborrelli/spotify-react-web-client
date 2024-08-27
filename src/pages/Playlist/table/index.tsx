import SongView from './SongView';
import { PlaylistControls } from '../controls';

// Interfaces
import { memo, type FC } from 'react';
import { PlaylistTableHeader } from './header';
import { useAppSelector } from '../../../store/store';

interface PlaylistListProps {
  color: string;
}

export const PlaylistList: FC<PlaylistListProps> = memo(({ color }) => {
  const tracks = useAppSelector((state) => state.playlist.tracks);

  return (
    <div
      className='playlist-list'
      style={{
        maxHeight: 323,
        background: `linear-gradient(${color} -30%, #121212 90%)`,
      }}
    >
      <PlaylistControls />
      <div className='playlist-table'>
        <PlaylistTableHeader />
      </div>
      <div>
        {tracks.map((song, index) => (
          <SongView song={song} key={song.added_at} index={index} />
        ))}
      </div>
    </div>
  );
});
