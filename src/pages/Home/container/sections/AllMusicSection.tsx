import { Col } from 'antd';
import { memo, type Dispatch, type SetStateAction } from 'react';

import { FavouriteArtists } from '../../components/favouriteArtists';
import { FeaturePlaylists } from '../../components/featurePlaylists';
import { MadeForYou } from '../../components/madeForYou';
import { MoreLikeArtistSection } from '../../components/moreLikeArtists/MoreLikeArtistSection';
import { NewReleases } from '../../components/newReleases';
import { RecentlyPlayed } from '../../components/recentlyPlayed';
import { Rankings } from '../../components/rankings';
import { TopMixes } from '../../components/topMixes';
import { TopTracks } from '../../components/topTracks';
import { Trending } from '../../components/trending';
import { YourPlaylists } from '../../components/yourPlaylists';
import { useAppSelector } from '../../../../store/store';

interface HomeAllMusicSectionProps {
  setColor: Dispatch<SetStateAction<string>>;
}

const MoreLikeArtistCol = memo(({ index }: { index: number }) => {
  const user = useAppSelector((state) => !!state.auth.user);
  const section = useAppSelector((state) => state.home.moreLikeArtists[index]);

  if (!user || !section) {
    return null;
  }

  return (
    <Col span={24}>
      <MoreLikeArtistSection section={section} />
    </Col>
  );
});

export const HomeAllMusicSection = memo(({ setColor }: HomeAllMusicSectionProps) => {
  const user = useAppSelector((state) => !!state.auth.user);
  const section = useAppSelector((state) => state.home.section);

  return (
    <>
      {user ? (
        <Col span={24}>
          <TopTracks setColor={setColor} />
        </Col>
      ) : null}

      {user ? (
        <Col span={24}>
          <MadeForYou />
        </Col>
      ) : null}

      <MoreLikeArtistCol index={0} />

      {user ? (
        <Col span={24}>
          <TopMixes />
        </Col>
      ) : null}

      <MoreLikeArtistCol index={1} />

      {user && section === 'ALL' ? (
        <Col span={24}>
          <RecentlyPlayed />
        </Col>
      ) : null}

      <Col span={24}>
        <FeaturePlaylists />
      </Col>

      <MoreLikeArtistCol index={2} />

      {user ? (
        <Col span={24}>
          <YourPlaylists />
        </Col>
      ) : null}

      <Col span={24}>
        <NewReleases />
      </Col>

      {!user || section === 'MUSIC' ? (
        <Col span={24}>
          <Rankings />
        </Col>
      ) : null}

      <MoreLikeArtistCol index={3} />

      {!user || section === 'MUSIC' ? (
        <Col span={24}>
          <Trending />
        </Col>
      ) : null}

      {user && section === 'ALL' ? (
        <Col span={24}>
          <FavouriteArtists />
        </Col>
      ) : null}
    </>
  );
});
