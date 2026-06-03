import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';

interface ScrollableGridCarouselProps {
  children: ReactNode;
  className?: string;
}

const ChevronLeft = () => (
  <svg aria-hidden='true' height='16' role='img' viewBox='0 0 16 16' width='16'>
    <path d='M10.47 2.47a.75.75 0 0 1 0 1.06L6.06 8l4.41 4.47a.75.75 0 1 1-1.06 1.06l-4.94-5a.75.75 0 0 1 0-1.06l4.94-5a.75.75 0 0 1 1.06 0Z' />
  </svg>
);

const ChevronRight = () => (
  <svg aria-hidden='true' height='16' role='img' viewBox='0 0 16 16' width='16'>
    <path d='M5.53 2.47a.75.75 0 0 0 0 1.06L9.94 8l-4.41 4.47a.75.75 0 1 0 1.06 1.06l4.94-5a.75.75 0 0 0 0-1.06l-4.94-5a.75.75 0 0 0-1.06 0Z' />
  </svg>
);

export const ScrollableGridCarousel: FC<ScrollableGridCarouselProps> = memo(
  ({ children, className = '' }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = useCallback(() => {
      const track = trackRef.current;
      if (!track) return;

      const { scrollLeft, scrollWidth, clientWidth } = track;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }, []);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      updateScrollState();

      track.addEventListener('scroll', updateScrollState, { passive: true });
      const observer = new ResizeObserver(updateScrollState);
      observer.observe(track);

      return () => {
        track.removeEventListener('scroll', updateScrollState);
        observer.disconnect();
      };
    }, [updateScrollState, children]);

    const scrollByPage = useCallback((direction: 'left' | 'right') => {
      const track = trackRef.current;
      if (!track) return;

      const amount = Math.max(track.clientWidth * 0.75, 200);
      track.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }, []);

    return (
      <div className='horizontal-grid-carousel'>
        {canScrollLeft ? (
          <>
            <div aria-hidden='true' className='horizontal-grid-carousel__fade horizontal-grid-carousel__fade--left' />
            <button
              type='button'
              aria-label='Scroll left'
              className='horizontal-grid-carousel__nav horizontal-grid-carousel__nav--left'
              onClick={() => scrollByPage('left')}
            >
              <ChevronLeft />
            </button>
          </>
        ) : null}

        <div
          ref={trackRef}
          className={`horizontal-grid-carousel__track playlist-grid playlist-grid--horizontal ${className}`.trim()}
        >
          {children}
        </div>

        {canScrollRight ? (
          <>
            <div
              aria-hidden='true'
              className='horizontal-grid-carousel__fade horizontal-grid-carousel__fade--right'
            />
            <button
              type='button'
              aria-label='Scroll right'
              className='horizontal-grid-carousel__nav horizontal-grid-carousel__nav--right'
              onClick={() => scrollByPage('right')}
            >
              <ChevronRight />
            </button>
          </>
        ) : null}
      </div>
    );
  },
);

ScrollableGridCarousel.displayName = 'ScrollableGridCarousel';
