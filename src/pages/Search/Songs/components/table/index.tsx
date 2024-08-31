// Components
import { Divider } from 'antd';
import SongView from './Song';
import { SearchSearchTableHeader } from './header';

// Redux
import { useAppSelector } from '../../../../../store/store';

// Interfaces
import { memo } from 'react';

export const SearchTracksTable = memo(() => {
  const tracks = useAppSelector((state) => state.search.songs);

  const hasTracks = tracks.length > 0;

  return (
    <div>
      {hasTracks ? (
        <div className='playlist-table'>
          <SearchSearchTableHeader />
        </div>
      ) : (
        <Divider />
      )}

      {hasTracks ? (
        <div style={{ paddingBottom: 30 }}>
          <div>
            {tracks.map((song, index) => (
              <SongView song={song} key={song.id} index={index} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
});
