import { Artist } from './artist';
import { NextInQueue } from './next';
import { NowPlayingCard } from './data';
import { Link } from 'react-router-dom';
import { NowPlayingLayout } from '../layout';
import { MenuIcon } from '../../../../Icons';
import { TrackActionsWrapper } from '../../../../Actions/TrackActions';
import { AddSongToLibraryButton } from '../../../../Actions/AddSongToLibrary';

// Redux
import { spotifyActions } from '../../../../../store/slices/spotify';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

// Interfaces
import type { Album } from '../../../../../interfaces/albums';
import type { Playlist } from '../../../../../interfaces/playlists';
import type { Artist as ArtistType } from '../../../../../interfaces/artist';

import { memo, ReactNode, useEffect, useMemo, type FC } from 'react';

// Redux
import { fetchArtist, playingNowActions } from '../../../../../store/slices/playingNow';

const Container: FC<{ song: Spotify.Track }> = memo(({ song }) => {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => state.spotify.liked);

  const handleToggle = () => {
    dispatch(spotifyActions.setLiked({ liked: !isLiked }));
  };

  return (
    <TrackActionsWrapper
      track={song}
      saved={isLiked}
      trigger={['contextMenu']}
      onSavedToggle={() => {
        dispatch(spotifyActions.setLiked({ liked: !isLiked }));
      }}
    >
      <div>
        <NowPlayingCard
          title={song.name}
          image={song.album.images[0].url}
          albumId={song.album.uri.split(':').reverse()[0]}
          subtitle={
            <span>
              {song.artists.slice(0, 3).map((a, i) => (
                <span key={a.uri}>
                  <Link to={`/artist/${a.uri.split(':').reverse()[0]}`}>{a.name}</Link>
                  {i < song.artists.slice(0, 3).length - 1 && ', '}
                </span>
              ))}
            </span>
          }
          extra={<AddSongToLibraryButton id={song.id!} isSaved={isLiked} onToggle={handleToggle} />}
        />
      </div>
    </TrackActionsWrapper>
  );
});

const getContextDetails = (
  context: string,
  song: Spotify.Track,
  album?: Album | null,
  artist?: ArtistType | null,
  playlist?: Playlist | null
) => {
  if (context.includes('playlist')) {
    return { title: playlist?.name, link: `/playlist/${playlist?.id}` };
  } else if (context.includes('album')) {
    return { title: album?.name, link: `/album/${album?.id}` };
  } else if (context.includes('artist')) {
    return { title: artist?.name, link: `/artist/${artist?.id}` };
  } else {
    return { title: song.name, link: `/album/${song.album.uri.split(':')[2]}` };
  }
};

const DetailsContainer: FC<{ children: ReactNode | ReactNode[] }> = memo((props) => {
  const dispatch = useAppDispatch();

  const isLiked = useAppSelector((state) => state.spotify.liked);
  const album = useAppSelector((state) => state.playingNow.album);
  const artist = useAppSelector((state) => state.playingNow.artist);
  const playlist = useAppSelector((state) => state.playingNow.playlist);
  const context = useAppSelector((state) => state.spotify.state?.context.uri);
  const song = useAppSelector((state) => state.spotify.state?.track_window.current_track!);

  const contextDetails = useMemo(
    () => getContextDetails(context!, song, album, artist, playlist),
    [context, song, album, artist, playlist]
  );

  return (
    <NowPlayingLayout
      title={contextDetails.title}
      link={contextDetails.link}
      extra={
        <TrackActionsWrapper
          track={song}
          saved={isLiked}
          trigger={['click']}
          onSavedToggle={() => {
            dispatch(spotifyActions.setLiked({ liked: !isLiked }));
          }}
        >
          <button>
            <MenuIcon />
          </button>
        </TrackActionsWrapper>
      }
    >
      {props.children}
    </NowPlayingLayout>
  );
});

export const Details = memo(() => {
  const dispatch = useAppDispatch();
  const context = useAppSelector((state) => state.spotify.state?.context.uri);
  const song = useAppSelector((state) => state.spotify.state?.track_window.current_track);

  const artistId = useMemo(() => song?.artists[0].uri.split(':')[2], [song]);

  useEffect(() => {
    if (artistId) dispatch(fetchArtist(artistId));
  }, [artistId, dispatch]);

  useEffect(() => {
    if (context) {
      const uri = context.split(':');
      if (uri[1] === 'playlist') {
        dispatch(playingNowActions.fetchPlaylist(uri[2]));
      } else if (uri[1] === 'album') {
        dispatch(playingNowActions.fetchAlbum(uri[2]));
      }
    }
  }, [context, dispatch]);

  if (!song) return null;

  return (
    <div>
      <DetailsContainer>
        <div>
          <Container song={song} />
          <Artist />
          <NextInQueue />
        </div>
      </DetailsContainer>
    </div>
  );
});
