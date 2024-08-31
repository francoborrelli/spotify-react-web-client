import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { TrackWithSave } from '../../../../interfaces/track';
import SongView, { SongViewComponents } from '../../../../components/SongsTable/songView';
import { profileActions } from '../../../../store/slices/profile';

interface SongProps {
  index: number;
  song: TrackWithSave;
}

export const Song = (props: SongProps) => {
  const { song, index } = props;

  const dispatch = useAppDispatch();
  const songs = useAppSelector((state) => state.profile.songs);

  const uris = useMemo(() => {
    return songs.slice(index).map((r) => r.uri);
  }, [songs, index]);

  return (
    <SongView
      activable
      view='LIST'
      song={song}
      index={index}
      context={{ uris }}
      saved={song.saved}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Album,
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
