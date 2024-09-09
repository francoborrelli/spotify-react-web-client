import { FC, memo } from 'react';
import { spotifyActions } from '../../../../store/slices/spotify';
import { AddSongToLibraryButton } from '../../../Actions/AddSongToLibrary';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';
import { Link } from 'react-router-dom';
import { TrackActionsWrapper } from '../../../Actions/TrackActions';
import { ArtistActionsWrapper } from '../../../Actions/ArtistActions';

const ArrowDown = (
  <svg
    width={16}
    height={16}
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='Svg-sc-ytk21e-0 dYnaPI'
  >
    <path d='M.47 4.97a.75.75 0 0 1 1.06 0L8 11.44l6.47-6.47a.75.75 0 1 1 1.06 1.06L8 13.56.47 6.03a.75.75 0 0 1 0-1.06z'></path>
  </svg>
);

const ArrowUp = (
  <svg
    width={16}
    height={16}
    data-encore-id='icon'
    role='img'
    aria-hidden='true'
    viewBox='0 0 16 16'
    className='Svg-sc-ytk21e-0 dYnaPI'
  >
    <path d='M15.53 11.03a.75.75 0 0 1-1.06 1.06L8 4.56 1.53 11.03a.75.75 0 1 1-1.06-1.06L8 2.44l7.53 7.53a.75.75 0 0 1 0 1.06z'></path>
  </svg>
);

const SongDetails: FC<{ isMobile?: boolean }> = memo((props) => {
  const dispatch = useAppDispatch();

  const current_track = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track,
    (prev, next) => prev?.id === next?.id
  );
  const isLiked = useAppSelector((state) => state.spotify.liked);
  const detailsOpen = useAppSelector((state) => !state.ui.detailsCollapsed);

  const handleToggle = () => {
    dispatch(spotifyActions.setLiked({ liked: !isLiked }));
  };

  if (!current_track) return <div className='mobile-hidden' style={{ minWidth: 295 }}></div>;

  return (
    <div className='flex flex-row items-center playing-container'>
      <div style={{ marginRight: 15 }}>
        <TrackActionsWrapper
          saved={isLiked}
          track={current_track}
          trigger={['contextMenu']}
          onSavedToggle={handleToggle}
        >
          <div className='playing-cover-container'>
            <img
              alt='Album Cover'
              className='album-cover'
              src={current_track?.album.images[0].url}
            />
            <button
              aria-label='Now playing view'
              className='playing-cover-details-button'
              onClick={() => {
                dispatch(uiActions.toggleDetails());
              }}
            >
              {detailsOpen ? ArrowDown : ArrowUp}
            </button>
          </div>
        </TrackActionsWrapper>
      </div>
      <div id='song-and-artist-name'>
        <TrackActionsWrapper
          saved={isLiked}
          track={current_track}
          trigger={['contextMenu']}
          onSavedToggle={handleToggle}
        >
          <p className='text-white font-bold song-title' title={current_track?.name}>
            {current_track?.name}
          </p>
        </TrackActionsWrapper>
        <span
          className='text-gray-200 song-artist'
          title={current_track?.artists
            .slice(0, 3)
            .map((a) => a.name)
            .join(', ')}
        >
          {current_track?.artists.slice(0, 3).map((a, i) => (
            <span key={a.uri}>
              <ArtistActionsWrapper artist={a} trigger={['contextMenu']}>
                <Link to={`/artist/${a.uri.split(':').reverse()[0]}`}>{a.name}</Link>
              </ArtistActionsWrapper>
              {i < current_track.artists.slice(0, 3).length - 1 && ', '}
            </span>
          ))}
        </span>
      </div>

      {!props.isMobile ? (
        <AddSongToLibraryButton
          size={17}
          isSaved={isLiked}
          id={current_track?.id!}
          onToggle={handleToggle}
        />
      ) : null}
    </div>
  );
});

export default SongDetails;
