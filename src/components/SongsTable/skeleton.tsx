import { Skeleton } from 'antd';

export const SongSkeleton = () => {
  return (
    <div style={{ margin: '5px 20px' }}>
      <Skeleton paragraph={false} avatar={false} active />
    </div>
  );
};
