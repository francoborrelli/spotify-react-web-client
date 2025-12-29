import SongView, { SongViewComponents } from '../../../components/SongsTable/songView';

// Redux
import { useAppDispatch, useAppSelector } from '../../../store/store';
import type { PlaylistItem } from '../../../interfaces/playlists';
import { likedSongsActions } from '../../../store/slices/likedSongs';

interface SongProps {
  index: number;
  song: PlaylistItem;
}

export const Song = (props: SongProps) => {
  const { song, index } = props;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const view = useAppSelector((state) => state.playlist.view);
  const playlist = useAppSelector((state) => state.playlist.playlist);

  return (
    <SongView
      activable
      view={view}
      saved={true}
      index={index}
      song={song.track}
      playlist={playlist}
      addedAt={song.added_at}
      context={{
        context_uri: `spotify:user:${user?.id}:collection`,
        offset: { position: index },
      }}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Artists,
        SongViewComponents.Album,
        SongViewComponents.AddedAt,
        (props) => (
          <SongViewComponents.AddToLiked
            {...props}
            onLikeRefresh={() => {
              dispatch(likedSongsActions.removeSong({ id: song.track.id }));
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
