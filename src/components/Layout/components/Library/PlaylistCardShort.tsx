import { useAppSelector } from '../../../../store/store';
import { Tooltip } from '../../../Tooltip';
import { Playlist } from '../../../../interfaces/playlists';
import { Album } from '../../../../interfaces/albums';

interface CardShortProps {
  image: string;
  title: string;
  uri: string;
  subtitle: string;
}

const CardShort = (props: CardShortProps) => {
  const { image, title, subtitle } = props;

  const collapsed = useAppSelector((state) => state.yourLibrary.collapsed);

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
          style={{ borderRadius: 10, display: 'flex', justifyContent: 'center' }}
          className='library-card collapsed'
        >
          <div className='image aspect-square h-full items-center'>
            <img src={image} alt='' style={{ width: 52 }} />
          </div>
        </button>
      </Tooltip>
    );
  }

  return (
    <button style={{ borderRadius: 10 }} className='library-card'>
      <div className='image aspect-square p-2 h-full items-center'>
        <img src={image} alt='' style={{ width: 52 }} />
      </div>
      <div id='playlist-song-and-artist-name'>
        <h3 className='text-md font-semibold text-white' style={{ fontSize: 15, marginBottom: -5 }}>
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
    </button>
  );
};

export const AlbumCardShort = ({ album }: { album: Album }) => {
  return (
    <CardShort
      image={album.images[0].url}
      title={album.name}
      subtitle={album.artists[0].name}
      uri={album.uri}
    />
  );
};

const PlaylistCardShort = ({ playlist }: { playlist: Playlist }) => {
  return (
    <CardShort
      image={playlist.images[0].url}
      title={playlist.name}
      subtitle={`Playlist • ${playlist.owner?.display_name}`}
      uri={playlist.uri}
    />
  );
};

export default PlaylistCardShort;
