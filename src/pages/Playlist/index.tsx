// Components
import { PlaylistList } from './list';
import { PlaylistHeader } from './header';

// Utils
import { FC, RefObject, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Constants
import { playlists } from '../../constants/cv';

// Redux
import { useAppDispatch } from '../../store/store';
import { playlistActions } from '../../store/slices/playlist';

const PlaylistView: FC<{ container: RefObject<HTMLDivElement> }> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { playlistId } = useParams();

  const playlist = playlists.find((playlist) => playlist.name.toLowerCase() === playlistId);

  useEffect(() => {
    if (!playlist) {
      navigate('/404');
    }

    dispatch(playlistActions.resetOrder({ order: playlist?.defaultFilter || '' }));
  }, [dispatch, playlist, navigate]);

  if (!playlist) {
    return null;
  }

  return (
    <div className='Playlist-section'>
      <PlaylistHeader playlist={playlist} container={props.container} />
      <PlaylistList playlist={playlist} />
    </div>
  );
};

PlaylistView.displayName = 'PlaylistView';

export default PlaylistView;
