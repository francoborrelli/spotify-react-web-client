import { memo } from 'react';

// Components
import { SearchTracksTable } from '../table';

// Utils
import { useAppSelector } from '../../../../../store/store';

export const SongsSearchSection = memo((props: { query: string }) => {
  const tracks = useAppSelector((state) => state.search.songs);
  if (!tracks || !tracks.length) {
    return null;
  }
  return <SearchTracksTable {...props} />;
});
