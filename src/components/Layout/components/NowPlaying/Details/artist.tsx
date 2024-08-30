import { FC } from 'react';
import { ArtistsCard } from './card';
import { useAppSelector } from '../../../../../store/store';
import { ArtistActionsWrapper } from '../../../../Actions/ArtistActions';
import { FollowArtistButton } from '../../../../../pages/Artist/container/controls/followButton';

export const Artist: FC = () => {
  const artist = useAppSelector((state) => state.playingNow.artist);
  if (!artist) return null;

  return (
    <ArtistActionsWrapper artist={artist} trigger={['contextMenu']}>
      <div>
        <ArtistsCard
          id={artist.id}
          title={artist?.name}
          image={artist.images[0].url}
          imageTitle={'About the artist'}
          extra={<FollowArtistButton id={artist.id} />}
          subtitle={`${artist.followers.total} followers`}
        />
      </div>
    </ArtistActionsWrapper>
  );
};
