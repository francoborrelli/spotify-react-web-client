import { useMemo } from 'react';
import SongView, { SongViewComponents } from '../../../../../components/SongsTable/songView';

// Redux
import { searchActions } from '../../../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

// Interfaces
import type { TrackWithSave } from '../../../../../interfaces/track';
import { profileActions } from '../../../../../store/slices/profile';

interface SongProps {
  index: number;
  song: TrackWithSave;
}

export const Song = (props: SongProps) => {
  const { song, index } = props;

  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => state.profile.songs);

  const uris = useMemo(() => tracks?.slice(index).map((track) => track.uri), [tracks, index]);

  return (
    <SongView
      activable
      song={song}
      view={'LIST'}
      index={index}
      saved={song.saved}
      context={{ uris }}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Artists,
        SongViewComponents.Album,
        SongViewComponents.AddedAt,
        (props) => (
          <SongViewComponents.AddToLiked
            {...props}
            onLikeRefresh={() => {
              dispatch(profileActions.setLinkedStateForTrack({ id: song.id, saved: !song.saved }));
            }}
          />
        ),
        SongViewComponents.Time,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
