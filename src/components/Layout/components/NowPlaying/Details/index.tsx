/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { memo, ReactNode, useEffect, useMemo, type FC } from 'react';

// Redux
import { fetchArtist } from '../../../../../store/slices/playingNow';

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

const DetailsContainer: FC<{ children: ReactNode | ReactNode[] }> = memo((props) => {
  const dispatch = useAppDispatch();

  const isLiked = useAppSelector((state) => state.spotify.liked);
  const context = useAppSelector(
    (state) => state.spotify.state?.context,
    (a, b) => a?.uri === b?.uri
  );
  const song = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track!,
    (a, b) => a?.id === b?.id
  );

  const contextDetails = useMemo(() => {
    const [_, type, id] = context?.uri!.split(':') || [];
    // @ts-ignore
    const name = context?.metadata?.context_description || song.name;
    if (type === 'playlist') {
      return { title: name, link: `/playlist/${id}` };
    } else if (type === 'album') {
      return { title: name, link: `/album/${id}` };
    } else if (type === 'artist') {
      return { title: name, link: `/artist/${id}` };
    } else {
      return { title: name, link: `/album/${song.album.uri.split(':')[2]}` };
    }
  }, [context, song]);

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

  const song = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track,
    (a, b) => a?.id === b?.id
  );

  const artistId = useMemo(() => song?.artists[0].uri.split(':')[2], [song]);

  useEffect(() => {
    if (artistId) dispatch(fetchArtist(artistId));
  }, [artistId, dispatch]);

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
