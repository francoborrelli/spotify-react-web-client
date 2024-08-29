// Components
import { PlaylistList } from './table';
import { PlaylistHeader } from './header';

// Utils
import { useParams } from 'react-router-dom';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';
import { FC, RefObject, useEffect, useRef, useState } from 'react';

// Redux
import { playlistActions } from '../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../store/store';

const PlaylistView: FC<{ container: RefObject<HTMLDivElement> }> = (props) => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { playlistId } = useParams<{ playlistId: string }>();

  const [color, setColor] = useState<string>('#121212');
  const playlist = useAppSelector((state) => state.playlist.playlist);

  useEffect(() => {
    if (playlist && playlist.images?.length) {
      getImageAnalysis2(playlist.images[0].url).then((color) => {
        setColor(color);
      });
    }
  }, [playlist]);

  useEffect(() => {
    if (playlistId) {
      dispatch(playlistActions.fetchPlaylist(playlistId));
    }
    return () => {
      dispatch(playlistActions.setPlaylist({ playlist: null }));
    };
  }, [dispatch, playlistId]);

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
