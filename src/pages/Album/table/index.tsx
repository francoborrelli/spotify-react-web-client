import SongView from './SongView';
import { AlbumControls } from '../controls';

// Interfaces
import { memo, useMemo, type FC } from 'react';
import { PlaylistTableHeader } from './header';
import { useAppSelector } from '../../../store/store';
import { OtherAlbums } from '../otherAlbums';
import { groupBy } from 'lodash';
import { AlbumIcon } from '../../../components/Icons';
import { useTranslation } from 'react-i18next';

interface PlaylistListProps {
  color: string;
}

export const AlbumList: FC<PlaylistListProps> = memo(({ color }) => {
  const [t] = useTranslation(['playlist']);
  const tracks = useAppSelector((state) => state.album.tracks);

  const disks = useMemo(() => {
    return Object.values(groupBy(tracks, 'disc_number'));
  }, [tracks]);

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
        {disks.map((disk, diskIndex) => (
          <div>
            {disks.length > 1 ? (
              <div className='disk-section'>
                <AlbumIcon /> {t('Disk')} {diskIndex + 1}
              </div>
            ) : null}
            {disk.map((song, index) => (
              <SongView song={song} key={song.id} index={index} />
            ))}
          </div>
        ))}
      </div>

      <div style={{ paddingBottom: 30 }}>
        <OtherAlbums />
      </div>
    </div>
  );
});
