// Components
import { PlaylistList } from './table';
import { PlaylistHeader } from './header';

// Utils
import { useParams } from 'react-router-dom';
import { FC, RefObject, useEffect, useState } from 'react';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';
import { playlistActions } from '../../store/slices/playlist';

const PlaylistView: FC<{ container: RefObject<HTMLDivElement> }> = (props) => {
  const dispatch = useAppDispatch();
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
    <div className='Playlist-section'>
      <PlaylistHeader container={props.container} color={color} />
      <PlaylistList color={color} />
    </div>
  );
};

PlaylistView.displayName = 'PlaylistView';

export default PlaylistView;
