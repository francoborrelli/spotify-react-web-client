// Components
import { PlaylistList } from './table';
import { PlaylistHeader } from './header';

// Utils
import { FC, RefObject, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';
import { playlistActions } from '../../store/slices/playlist';
import { Spinner } from '../../components/spinner/spinner';
import { getImageAnalysis } from '../../utils/imageAnyliser';

const PlaylistView: FC<{ container: RefObject<HTMLDivElement> }> = (props) => {
  const dispatch = useAppDispatch();
  const { playlistId } = useParams<{ playlistId: string }>();

  const [color, setColor] = useState<string>('#121212');
  const playlist = useAppSelector((state) => state.playlist.playlist);

  useEffect(() => {
    if (playlist && playlist.images?.length) {
      getImageAnalysis(playlist.images[0].url).then((color) => {
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

  return (
    <div className='Playlist-section'>
      <Spinner loading={!playlist}>
        <PlaylistHeader container={props.container} color={color} />
        <PlaylistList color={color} />
      </Spinner>
    </div>
  );
};

PlaylistView.displayName = 'PlaylistView';

export default PlaylistView;
