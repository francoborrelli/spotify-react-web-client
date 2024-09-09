// Components
import { PlayCircle } from '../../../components/Lists/PlayCircle';

// Redux
import { useAppSelector } from '../../../store/store';

// Interfaces
import { memo, useMemo, type FC } from 'react';

export const PlayCircleButton: FC<{ size?: number }> = memo(({ size = 30 }) => {
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const context = useAppSelector((state) => state.spotify.state?.context.uri);
  const isCurrent = useMemo(() => playlist?.uri === context, [playlist, context]);

  if (!playlist || !playlist.tracks?.total) return null;

  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      isCurrent={isCurrent}
      image={playlist?.images[0]?.url}
      context={{ context_uri: playlist?.uri! }}
    />
  );
});
