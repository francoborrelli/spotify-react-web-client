import { Col, Row } from 'antd';
import { memo, useMemo, useState } from 'react';
import { useAppSelector } from '../../../../store/store';
import TopSong from './song';

export const ArtistTopTracks = memo(() => {
  const [showAll, setShowAll] = useState(false);
  const topSongs = useAppSelector((state) => state.artist.topTracks);

  const items = useMemo(() => {
    if (showAll) {
      return topSongs;
    }
    return topSongs.slice(0, 5);
  }, [showAll, topSongs]);

  if (!topSongs.length) {
    return null;
  }

  return (
    <div style={{ margin: 10 }}>
      <h1 className='playlist-header'>Popular</h1>
      <Row>
        <Col span={24} xl={17}>
          <div>
            {items.map((song, index) => (
              <TopSong key={song.uri} song={song} index={index} />
            ))}
          </div>
        </Col>
      </Row>
      <button className='showMore' onClick={() => setShowAll((s) => !s)}>
        <span>{showAll ? 'Show less' : 'Show more'}</span>
      </button>
    </div>
  );
});
