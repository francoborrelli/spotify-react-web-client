import { memo } from 'react';
import SongView from './SongView';

import { useAppSelector } from '../../../store/store';

export const PlaylistRecommendations = memo(() => {
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const recommendations = useAppSelector((state) => state.playlist.recommedations);

  if (!playlist || !recommendations.length) return null;

  return (
    <div className='playlist-recommendations'>
      <h1 className='playlist-header'>Recommended</h1>
      <span>
        {playlist.tracks?.total ? `Based on what's in this playlist` : 'Based on your listening'}
      </span>

      <div style={{ margin: 5, marginTop: 10 }}>
        {recommendations.slice(0, 10).map((track) => (
          <SongView key={track.id} song={track} />
        ))}
      </div>
    </div>
  );
});
