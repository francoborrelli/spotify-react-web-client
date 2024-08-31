// Components
import { Divider } from 'antd';
import SongView from './Song';
import { PlaylistTableHeader } from './header';
import { PlaylistControls } from '../controls';

// Redux
import { likedSongsActions } from '../../../store/slices/likedSongs';
import { useAppDispatch, useAppSelector } from '../../../store/store';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';

// Interfaces
import { memo, type FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface LikedSongsListProps {
  color: string;
}

export const LikedSongsList: FC<LikedSongsListProps> = memo(({ color }) => {
  const dispatch = useAppDispatch();
  const total = useAppSelector((state) => state.likedSongs.total);
  const tracks = useAppSelector((state) => state.likedSongs.items);

  return (
    <div
      className='playlist-list'
      style={{
        maxHeight: 323,
        background: `linear-gradient(${color} -50%, ${DEFAULT_PAGE_COLOR} 90%)`,
      }}
    >
      <PlaylistControls />
      {!!total ? (
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
          dispatch(likedSongsActions.fetchMore());
        }}
        hasMore={tracks.length < total}
      >
        {!!total ? (
          <div style={{ paddingBottom: 30 }}>
            {tracks.map((song, index) => (
              <SongView song={song} key={`${song.added_at}-${song.track.id}`} index={index} />
            ))}
          </div>
        ) : null}
      </InfiniteScroll>
    </div>
  );
});
