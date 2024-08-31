// Components
import { PlayCircle } from '../../../components/Lists/PlayCircle';

// Redux
import { useAppSelector } from '../../../store/store';

// Interfaces
import { memo, useMemo, type FC } from 'react';

export const PlayCircleButton: FC<{ size?: number }> = memo(({ size = 30 }) => {
  const user = useAppSelector((state) => state.auth.user);

  const hasSongs = useAppSelector((state) => !!state.likedSongs.items.length);
  const context = useAppSelector((state) => state.spotify.state?.context.uri);

  const isCurrent = useMemo(
    () => context === `spotify:user:${user?.id}:collection`,
    [context, user?.id]
  );

  if (!hasSongs) return null;

  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      isCurrent={isCurrent}
      context={{ context_uri: `spotify:user:${user?.id}:collection` }}
    />
  );
});
