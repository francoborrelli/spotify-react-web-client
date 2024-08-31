// Components
import SongView from './Song';
import { Divider } from 'antd';
import { SearchSearchTableHeader } from './header';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

// Interfaces
import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { searchActions } from '../../../../../store/slices/search';

export const SearchTracksTable = memo((props: { query: string }) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => state.search.songs);
  const total = useAppSelector((state) => state.search.songsTotal);

  const hasTracks = tracks.length > 0;
  const hasMore = tracks.length < total;

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
          <InfiniteScroll
            loader={null}
            hasMore={hasMore}
            scrollThreshold={0.4}
            dataLength={tracks.length}
            next={() => {
              dispatch(searchActions.fetchMoreSongs(props.query));
            }}
          >
            <div>
              {tracks.map((song, index) => (
                <SongView song={song} key={song.id} index={index} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : null}
    </div>
  );
});
