import { useCallback } from 'react';
import { TrackWithSave } from '../../../../interfaces/track';
import SongView, { SongViewComponents } from '../../../../components/SongsTable/songView';

// Redux
import { artistActions } from '../../../../store/slices/artist';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

interface SongProps {
  index: number;
  song: TrackWithSave;
}

export const Song = (props: SongProps) => {
  const { song, index } = props;

  const dispatch = useAppDispatch();
  const artist = useAppSelector((state) => state.artist.artist);

  const toggleLike = useCallback(() => {
    dispatch(artistActions.setTopSongLikeState({ id: song.id, saved: !song.saved }));
  }, [dispatch, song.saved, song.id]);

  return (
    <SongView
      activable
      song={song}
      index={index}
      view={'LIST'}
      saved={song.saved}
      onToggleLike={toggleLike}
      context={{
        context_uri: artist?.uri,
        offset: { position: index },
      }}
      fields={[
        SongViewComponents.TitleWithCover,
        (props) => <SongViewComponents.AddToLiked {...props} onLikeRefresh={toggleLike} />,
        SongViewComponents.Time,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
