import { FC, memo } from 'react';
import { ArtistTopTracks } from '../components/topTracks';
import { Discography } from '../components/discography';
import { AppearsOn } from '../components/otherArtists';
import { ArtistControls } from './controls';

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

        <AppearsOn />
      </div>
    </div>
  );
});

ArtistContent.displayName = 'GenreContent';

export default ArtistContent;
