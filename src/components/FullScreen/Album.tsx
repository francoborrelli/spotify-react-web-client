import { memo } from 'react';
import { useAppSelector } from '../../store/store';
import { ArtistActionsWrapper } from '../Actions/ArtistActions';
import { Link } from 'react-router-dom';

const AlbumSongDetails = memo(() => {
  const currentSong = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track,
    (a, b) => a?.id === b?.id
  );

  if (!currentSong) return <></>;

  return (
    <div className='flex flex-row items-center'>
      <img alt='Album Cover' className='album-cover' src={`${currentSong?.album.images[0].url}`} />
      <div id='song-and-artist-name'>
        <p className='text-white font-bold song-title' title={currentSong?.name}>
          {currentSong?.name}
        </p>
        <p
          className='text-gray-200 song-artist'
          title={currentSong?.artists.map((a) => a.name).join(', ')}
        >
          {currentSong?.artists.slice(0, 3).map((a, i) => (
            <span key={a.uri}>
              <ArtistActionsWrapper artist={a} trigger={['contextMenu']}>
                <Link target='_blank' to={`/artist/${a.uri.split(':').reverse()[0]}`}>
                  {a.name}
                </Link>
              </ArtistActionsWrapper>
              {i < currentSong.artists.slice(0, 3).length - 1 && ', '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
});

AlbumSongDetails.displayName = 'FullScreenAlbumSongDetails';

export default AlbumSongDetails;
