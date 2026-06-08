// Components
import { PlaylistList } from './table';
import { PlaylistHeader } from './header';

// Utils
import { useParams } from 'react-router-dom';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';
import { FC, RefObject, useEffect, useRef, useState } from 'react';

// Redux
import { playlistActions } from '../../store/slices/playlist';
import { useGetPlaylistPageQuery } from '../../store/endpoints/catalog';
import { useAppDispatch, useAppSelector } from '../../store/store';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../constants/spotify';
import tinycolor from 'tinycolor2';

const PlaylistView: FC<{ container: RefObject<HTMLDivElement | null> }> = (props) => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { playlistId } = useParams<{ playlistId: string }>();

  const [color, setColor] = useState<string>(DEFAULT_PAGE_COLOR);
  const playlist = useAppSelector((state) => state.playlist.playlist);

  useEffect(() => {
    if (playlist && playlist.images?.length) {
      getImageAnalysis2(playlist?.images[0].url).then((color) => {
        let item = tinycolor(color);
        while (item.isLight()) {
          item = item.darken(10);
        }
        setColor(item.toHexString());
      });
    }
  }, [playlist]);

  // Cached/deduped via RTK Query (short TTL since playlists are mutable); mirrored into the
  // playlist slice for existing sub-components. Pagination still uses getNextTracks.
  const { data: playlistData } = useGetPlaylistPageQuery(playlistId!, { skip: !playlistId });

  useEffect(() => {
    if (playlistData) {
      dispatch(playlistActions.setPlaylistData(playlistData));
    } else {
      dispatch(playlistActions.setPlaylist({ playlist: null }));
    }
  }, [playlistData, dispatch]);

  if (!playlist) return null;

  return (
    <div className='Playlist-section' ref={containerRef}>
      <PlaylistHeader color={color} container={props.container} sectionContainer={containerRef} />
      <PlaylistList color={color} />
    </div>
  );
};

PlaylistView.displayName = 'PlaylistView';

export default PlaylistView;
