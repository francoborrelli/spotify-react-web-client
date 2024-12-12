// Components
import SongView from './Song';
import { Affix, Divider } from 'antd';
import { ProfileSongsTableHeader } from './header';

// Redux
import { useAppSelector } from '../../../../../store/store';

// Interfaces
import { FC, memo } from 'react';

interface ProfileTracksTableProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export const ProfileTracksTable: FC<ProfileTracksTableProps> = memo((props) => {
  const tracks = useAppSelector((state) => state.profile.songs);

  const hasTracks = tracks.length > 0;

  return (
    <div>
      {hasTracks ? (
        <div className='playlist-table'>
          <Affix target={() => props.container.current}>
            <ProfileSongsTableHeader />
          </Affix>
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
