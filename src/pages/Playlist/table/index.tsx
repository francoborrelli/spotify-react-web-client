import SongView from './SongView';
import { PlaylistControls } from '../controls';

import ReactDragListView from 'react-drag-listview';

// Interfaces
import { memo, type FC } from 'react';
import { PlaylistTableHeader } from './header';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { playlistService } from '../../../services/playlists';
import { playlistActions } from '../../../store/slices/playlist';

interface PlaylistListProps {
  color: string;
}

export const PlaylistList: FC<PlaylistListProps> = memo(({ color }) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => state.playlist.tracks);
  const canEdit = useAppSelector((state) => state.playlist.canEdit);
  const playlist = useAppSelector((state) => state.playlist.playlist);

  return (
    <div
      className='playlist-list'
      style={{
        maxHeight: 323,
        background: `linear-gradient(${color} -50%, #121212 90%)`,
      }}
    >
      <PlaylistControls />
      <div className='playlist-table'>
        <PlaylistTableHeader />
      </div>
      {canEdit ? (
        <div>
          <ReactDragListView
            nodeSelector='button'
            lineClassName='drag-line'
            onDragEnd={(from, to) => {
              playlistService
                .reorderPlaylistItems(
                  playlist?.id!,
                  [tracks[from].track.uri],
                  from,
                  to,
                  1,
                  playlist?.snapshot_id!
                )
                .then(() => {
                  dispatch(playlistActions.reorderTracks({ from, to }));
                });
            }}
          >
            {tracks.map((song, index) => (
              <SongView song={song} key={song.added_at} index={index} />
            ))}
          </ReactDragListView>
        </div>
      ) : (
        <div>
          {tracks.map((song, index) => (
            <SongView song={song} key={song.added_at} index={index} />
          ))}
        </div>
      )}
    </div>
  );
});
