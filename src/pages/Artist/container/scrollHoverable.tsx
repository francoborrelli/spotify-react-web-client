import { FC, memo, RefObject } from 'react';
import { PageHeader } from '../../../components/Layout/components/Header';
import { useAppSelector } from '../../../store/store';
import { PlayCircleButton } from './controls/playCircle';
import { Space } from 'antd';

interface ArtistPageProps {
  color: string;
  container: RefObject<HTMLDivElement | null>;
  sectionContainer: RefObject<HTMLDivElement | null>;
}

export const ArtistHoverableMenu: FC<ArtistPageProps> = memo((props) => {
  const artist = useAppSelector(
    (state) => state.artist.artist,
    (prev, next) => prev?.id === next?.id
  );

  return (
    <PageHeader {...props} activeHeider={270} activeContentHeight={320}>
      <Space>
        <PlayCircleButton size={20} />
        <h1 className='playlist-header'>{artist?.name}</h1>
      </Space>
    </PageHeader>
  );
});

export default ArtistHoverableMenu;
