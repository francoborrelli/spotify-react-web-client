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
import { memo, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

interface PlaylistListProps {
  color: string;
}

export const PlaylistList: FC<PlaylistListProps> = memo(({ color }) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation(['order']);
  const tracks = useAppSelector((state) => state.playlist.tracks);
  const search = useAppSelector((state) => state.playlist.search);
  const canEdit = useAppSelector((state) => state.playlist.canEdit);
  const playlist = useAppSelector((state) => state.playlist.playlist);

  const hasTracks = !!playlist?.tracks?.total;
  const isSearching = Boolean(search.trim());

  const visibleTracks = useMemo(() => {
    const indexed = tracks.map((song, index) => ({ song, index }));
    if (!isSearching) return indexed;

    const query = search.trim().toLowerCase();
    return indexed.filter(({ song }) => {
      const track = song.track;
      return (
        track.name.toLowerCase().includes(query) ||
        track.artists.some((artist) => artist.name.toLowerCase().includes(query)) ||
        track.album?.name?.toLowerCase().includes(query)
      );
    });
  }, [tracks, search, isSearching]);

  const hasNoSearchResults = isSearching && visibleTracks.length === 0;

  return (
    <div
      className='playlist-list'
      style={{
        maxHeight: 323,
        background: `linear-gradient(${color} -50%, ${DEFAULT_PAGE_COLOR} 90%)`,
      }}
    >
      <PlaylistControls />
      {hasTracks && !hasNoSearchResults ? (
        <div className='playlist-table'>
          <PlaylistTableHeader />
        </div>
      ) : !hasTracks ? (
        <Divider />
      ) : null}

      {hasNoSearchResults ? (
        <div className='playlist-search-empty'>
          <h3>
            {t("Couldn't find")} “{search.trim()}”
          </h3>
          <p>{t('Try searching again using a different spelling or keyword.')}</p>
        </div>
      ) : (
        <InfiniteScroll
          loader={null}
          scrollThreshold={0.5}
          dataLength={tracks.length}
          next={() => {
            dispatch(playlistActions.getNextTracks());
          }}
          hasMore={!isSearching && tracks.length < playlist?.tracks?.total!}
        >
          {hasTracks ? (
            <div style={{ paddingBottom: 30 }}>
              {canEdit && !isSearching ? (
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
                    {visibleTracks.map(({ song, index }) => (
                      <SongView
                        song={song}
                        key={`${song.added_at}-${song.track.id}`}
                        index={index}
                      />
                    ))}
                  </ReactDragListView>
                </div>
              ) : (
                <div>
                  {visibleTracks.map(({ song, index }) => (
                    <SongView
                      song={song}
                      key={`${song.added_at}-${song.track.id}`}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </InfiniteScroll>
      )}

      {!hasNoSearchResults ? <PlaylistRecommendations /> : null}
    </div>
  );
});
