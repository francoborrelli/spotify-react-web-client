import { useAppSelector } from '../../../store/store';
import { PlayCircle } from '../../Home/components/PlayCircle';

// Interfaces
import { memo, useMemo, type FC } from 'react';

export const PlayCircleButton: FC<{ size?: number }> = memo(({ size = 30 }) => {
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const context = useAppSelector((state) => state.spotify.state?.context.uri);
  const isCurrent = useMemo(() => playlist?.uri === context, [playlist, context]);
  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      isCurrent={isCurrent}
      context={{ context_uri: playlist?.uri! }}
    />
  );
});
