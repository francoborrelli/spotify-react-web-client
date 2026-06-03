import { Col } from 'antd';
import { memo } from 'react';

import { Podcasts } from '../../components/podcasts';
import { PodcastFollowing } from '../../components/podcasts/Following';
import { useAppSelector } from '../../../../store/store';

export const HomePodcastSection = memo(() => {
  const user = useAppSelector((state) => !!state.auth.user);
  const podcastFilter = useAppSelector((state) => state.home.podcastFilter);

  if (!user) {
    return null;
  }

  if (podcastFilter === 'FOLLOWING') {
    return (
      <Col span={24}>
        <PodcastFollowing />
      </Col>
    );
  }

  return (
    <Col span={24}>
      <Podcasts />
    </Col>
  );
});
