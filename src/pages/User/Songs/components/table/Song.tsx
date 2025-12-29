import { useCallback, useMemo } from 'react';
import SongView, { SongViewComponents } from '../../../../../components/SongsTable/songView';

// Redux
import { profileActions } from '../../../../../store/slices/profile';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

// Interfaces
import type { TrackWithSave } from '../../../../../interfaces/track';

interface SongProps {
  index: number;
  song: TrackWithSave;
}

export const Song = (props: SongProps) => {
  const { song, index } = props;

  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => state.profile.songs);

  const uris = useMemo(() => tracks?.slice(index).map((track) => track.uri), [tracks, index]);

  const onToggleLike = useCallback(() => {
    dispatch(profileActions.setLinkedStateForTrack({ id: song.id, saved: !song.saved }));
  }, [dispatch, song.saved, song.id]);

  return (
    <SongView
      activable
      song={song}
      view={'LIST'}
      index={index}
      saved={song.saved}
      context={{ uris }}
      onToggleLike={onToggleLike}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Artists,
        SongViewComponents.Album,
        SongViewComponents.AddedAt,
        (props) => <SongViewComponents.AddToLiked {...props} onLikeRefresh={onToggleLike} />,
        SongViewComponents.Time,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
