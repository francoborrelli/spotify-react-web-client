import { Space } from 'antd';
import { FC, memo, RefObject } from 'react';
import { useAppSelector } from '../../../../store/store';
import { PageHeader } from '../../../../components/Layout/components/Header';

interface ArtistPageProps {
  color: string;
  container: RefObject<HTMLDivElement | null>;
  sectionContainer: RefObject<HTMLDivElement | null>;
}

export const UserHoverableMenu: FC<ArtistPageProps> = memo((props) => {
  const user = useAppSelector((state) => state.profile.user);
  return (
    <PageHeader {...props} hiddenContent activeHeider={270} activeContentHeight={320}>
      <Space>
        <h1 style={{ margin: 0 }} className='playlist-header'>
          {user?.display_name}
        </h1>
      </Space>
    </PageHeader>
  );
});

export default UserHoverableMenu;
