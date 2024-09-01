import { useCallback, useMemo } from 'react';
import SongView, { SongViewComponents } from '../../../../../components/SongsTable/songView';

// Redux
import { searchActions } from '../../../../../store/slices/search';
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
  const tracks = useAppSelector((state) => state.search.songs);

  const uris = useMemo(() => tracks?.slice(index).map((track) => track.uri), [tracks, index]);

  const toggleLike = useCallback(() => {
    dispatch(searchActions.setSavedStateForTrack({ id: song.id, saved: !song.saved }));
  }, [dispatch, song.saved, song.id]);

  return (
    <SongView
      activable
      song={song}
      view={'LIST'}
      index={index}
      saved={song.saved}
      context={{ uris }}
      onToggleLike={toggleLike}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Artists,
        SongViewComponents.Album,
        SongViewComponents.AddedAt,
        (props) => <SongViewComponents.AddToLiked {...props} onLikeRefresh={toggleLike} />,
        SongViewComponents.Time,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
