import { PlayCircle } from '../PlayCircle';

import type { Album } from '../../../interfaces/albums';

const Card = ({
  title,
  image,
  onClick,
  description,
}: {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className='playlist-card relative rounded-lg overflow-hidden  hover:bg-spotify-gray-lightest transition'
    >
      <div
        style={{ position: 'relative' }}
        className='aspect-square md:aspect-w-1 md:aspect-h-1/2 lg:aspect-w-1 lg:aspect-h-3/4 xl:aspect-w-1 xl:aspect-h-4/5 p-4'
      >
        <img src={image} alt='' style={{ borderRadius: 5, width: '100%' }} />
        <div className='circle-play-div transition translate-y-1/4'>
          <PlayCircle />
        </div>
      </div>
      <div className='playlist-card-info'>
        <h3 className='text-md font-semibold text-white'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const AlbumCard = ({ item, onClick }: { item: Album; onClick: () => void }) => {
  const title = item.name;
  const description = item.artists.map((artist) => artist.name).join(', ');
  return (
    <Card title={title} image={item.images[0].url} description={description} onClick={onClick} />
  );
};
