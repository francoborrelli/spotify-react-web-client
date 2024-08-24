import { FC } from 'react';

interface PlayCircleProps {
  size?: number;
  big?: boolean;
  playing?: boolean;
  onClick?: (e?: any) => void;
}

export const PlayCircle: FC<PlayCircleProps> = ({ size = 20, big, playing, onClick }) => {
  return (
    <button onClick={onClick} className={big ? 'circle-play big' : 'circle-play'}>
      <span>
        {!playing ? (
          <svg
            style={{ height: size }}
            data-encore-id='icon'
            role='img'
            aria-hidden='true'
            viewBox='0 0 16 16'
          >
            <path d='M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z'></path>
          </svg>
        ) : (
          <svg
            style={{ height: size }}
            data-encore-id='icon'
            role='img'
            aria-hidden='true'
            viewBox='0 0 24 24'
          >
            <path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
          </svg>
        )}
      </span>
    </button>
  );
};
