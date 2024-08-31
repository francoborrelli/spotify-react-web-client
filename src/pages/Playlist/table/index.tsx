// Components
import { Divider } from 'antd';
import SongView from './Song';
import { PlaylistTableHeader } from './header';
import { PlaylistControls } from '../controls';
import ReactDragListView from 'react-drag-listview';
import { PlaylistRecommendations } from '../recommendations';

// Services
import { playlistService } from '../../../services/playlists';

// Redux
import { playlistActions } from '../../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../../store/store';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';

// Interfaces
import { memo, type FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface PlaylistListProps {
  color: string;
}

export const PlaylistList: FC<PlaylistListProps> = memo(({ color }) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => state.playlist.tracks);
  const canEdit = useAppSelector((state) => state.playlist.canEdit);
  const playlist = useAppSelector((state) => state.playlist.playlist);

  const hasTracks = !!playlist?.tracks?.total;

  return (
    <div
      className='playlist-list'
      style={{
        maxHeight: 323,
        background: `linear-gradient(${color} -50%, ${DEFAULT_PAGE_COLOR} 90%)`,
      }}
    >
      <PlaylistControls />
      {hasTracks ? (
        <div className='playlist-table'>
          <PlaylistTableHeader />
        </div>
      ) : (
        <Divider />
      )}

      <InfiniteScroll
        loader={null}
        scrollThreshold={0.5}
        dataLength={tracks.length}
        next={() => {
          dispatch(playlistActions.getNextTracks());
        }}
        hasMore={tracks.length < playlist?.tracks?.total!}
      >
        {hasTracks ? (
          <div style={{ paddingBottom: 30 }}>
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
                    <SongView song={song} key={`${song.added_at}-${song.track.id}`} index={index} />
                  ))}
                </ReactDragListView>
              </div>
            ) : (
              <div>
                {tracks.map((song, index) => (
                  <SongView song={song} key={`${song.added_at}-${song.track.id}`} index={index} />
                ))}
              </div>
            )}
          </div>
        ) : null}
      </InfiniteScroll>

      <PlaylistRecommendations />
    </div>
  );
});
