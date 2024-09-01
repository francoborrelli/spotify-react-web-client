import { useCallback } from 'react';
import SongView, { SongViewComponents } from '../../../../components/SongsTable/songView';

// Redux
import { albumActions } from '../../../../store/slices/album';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

// Interfaces
import type { TrackWithSave } from '../../../../interfaces/track';

interface SongProps {
  index: number;
  song: TrackWithSave;
}

export const Song = (props: SongProps) => {
  const { song, index } = props;

  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => state.album.view);
  const album = useAppSelector((state) => state.album.album);

  const toggleOpen = useCallback(() => {
    dispatch(albumActions.updateTrackLikeState({ id: song.id, saved: !song.saved }));
  }, [dispatch, song.id, song.saved]);

  return (
    <SongView
      activable
      view={view}
      song={song}
      index={index}
      album={album}
      saved={song.saved}
      onToggleLike={toggleOpen}
      context={{
        context_uri: album?.uri,
        offset: { position: index },
      }}
      fields={[
        SongViewComponents.Title,
        SongViewComponents.Artists,
        (props) => <SongViewComponents.AddToLiked {...props} onLikeRefresh={toggleOpen} />,
        SongViewComponents.Time,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
