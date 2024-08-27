import { Tooltip } from '../../../Tooltip';
import { SpeakerIcon } from '../../../Icons';

// Redux
import { useAppSelector } from '../../../../store/store';

// Interface
import type { Album } from '../../../../interfaces/albums';
import type { Artist } from '../../../../interfaces/artist';
import type { Playlist } from '../../../../interfaces/playlists';
import { playerService } from '../../../../services/player';
import { useNavigate } from 'react-router-dom';

interface CardShortProps {
  uri: string;
  image: string;
  title: string;
  subtitle: string;
  rounded?: boolean;
  playing?: boolean;
  onClick?: () => void;
}

const Play = (
  <svg
    data-encore-id='icon'
    role='img'
    width={26}
    height={26}
    fill='white'
    aria-hidden='true'
    className='Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq'
    viewBox='0 0 24 24'
  >
    <path d='m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z'></path>
  </svg>
);

const Pause = (
  <svg
    data-encore-id='icon'
    role='img'
    width={26}
    height={26}
    fill='white'
    aria-hidden='true'
    className='Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq'
    viewBox='0 0 24 24'
  >
    <path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
  </svg>
);

const CardShort = (props: CardShortProps) => {
  const { image, title, subtitle, playing, onClick } = props;

  const collapsed = useAppSelector((state) => state.ui.libraryCollapsed);

  if (collapsed) {
    return (
      <Tooltip
        placement='right'
        title={
          <div>
            <p>{title}</p>
            <p style={{ fontSize: 13, color: 'gray', fontWeight: 400 }}>{subtitle}</p>
          </div>
        }
      >
        <button
          onClick={onClick}
          style={{ borderRadius: 10, display: 'flex', justifyContent: 'center' }}
          className='library-card collapsed'
        >
          <div className={`image h-full items-center ${props.rounded ? 'rounded' : ''}`}>
            <img src={image} alt='' style={{ width: 52, height: 52 }} />
          </div>
        </button>
      </Tooltip>
    );
  }

  const button = (
    <button
      className='image-button'
      onClick={async (e) => {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        }
        if (playing) {
          return playerService.pausePlayback();
        }
        return playerService.startPlayback(!playing ? { context_uri: props.uri } : undefined);
      }}
    >
      {playing ? Pause : Play}
    </button>
  );

  return (
    <button style={{ borderRadius: 10 }} className='library-card' onClick={onClick}>
      <div className={`image p-2 h-full items-center ${props.rounded ? 'rounded' : ''}`}>
        <div style={{ position: 'relative' }}>
          <div>
            <img
              src={image}
              alt='song cover'
              className='rounded-md'
              style={{ width: 52, height: 52 }}
            />
          </div>
          {button}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div id='playlist-song-and-artist-name'>
          <h3
            className='text-md font-semibold text-white'
            style={{
              fontSize: 15,
              marginBottom: -5,
              color: playing ? '#1db954' : undefined,
              fontWeight: 100,
            }}
          >
            {title}
          </h3>

          <p
            className='text-md font-semibold text-white'
            style={{
              fontSize: 13,
              opacity: 0.7,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div style={{ padding: 8 }}>
          {playing ? <SpeakerIcon fill='#1db954' height={16} width={16} /> : null}
        </div>
      </div>
    </button>
  );
};

export const ArtistCardShort = ({ artist }: { artist: Artist }) => {
  const state = useAppSelector((state) => state.spotify.state);

  return (
    <CardShort
      rounded
      subtitle='Artist'
      uri={artist.uri}
      title={artist.name}
      image={artist.images[0].url}
      playing={state?.context?.uri === artist.uri}
    />
  );
};

export const AlbumCardShort = ({ album }: { album: Album }) => {
  const state = useAppSelector((state) => state.spotify.state);

  return (
    <CardShort
      image={album.images[0].url}
      title={album.name}
      subtitle={album.artists[0].name}
      uri={album.uri}
      playing={state?.context?.uri === album.uri}
    />
  );
};

const PlaylistCardShort = ({ playlist }: { playlist: Playlist }) => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state.spotify.state);

  const onClick = () => {
    navigate(`/playlist/${playlist.id}`);
  };

  return (
    <CardShort
      onClick={onClick}
      uri={playlist.uri}
      title={playlist.name}
      image={playlist.images[0].url}
      playing={state?.context?.uri === playlist.uri}
      subtitle={`Playlist • ${playlist.owner?.display_name}`}
    />
  );
};

export default PlaylistCardShort;
