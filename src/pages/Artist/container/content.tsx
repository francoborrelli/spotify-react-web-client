import { FC, memo } from 'react';

import { ArtistControls } from './controls';
import { AppearsOn } from '../components/appearsOn';
import { Discography } from '../components/discography';
import { ArtistTopTracks } from '../components/topTracks';
import { OtherArtists } from '../components/otherArtists';

export const ArtistContent: FC<{
  color: string;
}> = memo((props) => {
  return (
    <div
      className='artist-page-content'
      style={{
        // @ts-ignore
        '--background-base': props.color,
      }}
    >
      <div style={{ margin: 20, paddingTop: 30, paddingBottom: 30 }}>
        <ArtistControls />

        <ArtistTopTracks />

        <Discography />

        <OtherArtists />

        <AppearsOn />
      </div>
    </div>
  );
});

ArtistContent.displayName = 'GenreContent';

export default ArtistContent;
