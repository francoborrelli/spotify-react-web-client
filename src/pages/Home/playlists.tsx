import { FC, useCallback } from 'react';
import PlaylistCard from './PlaylistCard';

// Utils
import { useNavigate } from 'react-router-dom';

// Constants
import { playlists } from '../../constants/cv';

// Interfaces
import type { Playlist } from '../../interfaces/types';

export const PlaylistsSection: FC<{ title: string }> = (props) => {
  const navigate = useNavigate();

  const onClick = useCallback(
    (name: string) => {
      navigate(`/playlist/${name}`);
    },
    [navigate]
  );

  return (
    <div>
      <h1 className='playlist-header'>{props.title}</h1>
      <div className='grid grid-cols-3 xxs:grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {playlists.map((playlist: Playlist, index: number) => {
          return (
            <div key={playlist.name}>
              <PlaylistCard
                playlist={playlist}
                onClick={() => onClick(playlist.name.toLowerCase())}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
