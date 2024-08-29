// Interfaces
import { RefObject, useEffect, useState, type FC } from 'react';

// Utils
import tinycolor from 'tinycolor2';
import { useAppSelector } from '../../../../store/store';

interface PageHeaderProps {
  children: any;
  color: string;
  activeHeider?: number;
  activeContentHeight?: number;
  container: RefObject<HTMLDivElement>;
  sectionContainer?: RefObject<HTMLDivElement>;
}

export const PageHeader: FC<PageHeaderProps> = ({
  color,
  children,
  container,
  sectionContainer,
  activeHeider = 260,
  activeContentHeight = 260,
}) => {
  const [headerWidth, setHeaderWidth] = useState(0);
  const [activeHeader, setActiveHeader] = useState(false);

  const queueCollapsed = useAppSelector((state) => state.ui.queueCollapsed);
  const libraryCollapsed = useAppSelector((state) => state.ui.libraryCollapsed);
  const detailsCollapsed = useAppSelector((state) => state.ui.detailsCollapsed);

  useEffect(() => {
    const ref = container.current;
    const handleScroll = () => {
      if (ref) {
        setActiveHeader(ref.scrollTop > activeHeider);
      }
    };
    ref?.addEventListener('scroll', handleScroll);
    return () => {
      window.onresize = null;
      ref?.removeEventListener('scroll', handleScroll);
    };
  }, [
    container,
    activeHeider,
    activeContentHeight,
    queueCollapsed,
    libraryCollapsed,
    detailsCollapsed,
  ]);

  useEffect(() => {
    const ref = sectionContainer?.current;
    if (ref) {
      const observer = new ResizeObserver((entries) => {
        setHeaderWidth(entries[0].contentRect.width);
      });
      observer.observe(ref);
      return () => ref && observer.unobserve(ref);
    }
  }, [sectionContainer, queueCollapsed, libraryCollapsed, detailsCollapsed]);

  return (
    <div
      style={{
        overflow: 'auto',
        position: 'relative',
        background: `linear-gradient(180deg, transparent 0px, ${color} 80%), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=")`,
      }}
    >
      <div
        className={`nav-header ${activeHeader ? 'active' : ''}`}
        style={{
          width: headerWidth,
          opacity: !headerWidth ? 0 : 1,
          backgroundColor: !activeHeader
            ? 'transparent'
            : tinycolor(color).darken(10).toRgbString(),
        }}
      >
        <div className='nav-header-content'>{children}</div>
      </div>
    </div>
  );
};
