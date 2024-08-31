import { memo, useLayoutEffect, useState } from 'react';

// Components
import { Drawer } from 'antd';

// Redux
import { useAppSelector } from '../../store/store';
import YourLibrary from '../Layout/components/Library/list';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const LibraryDrawer = memo(() => {
  const [width] = useWindowSize();

  const open = useAppSelector((state) => !state.ui.libraryCollapsed);

  if (width > 900) return null;

  return (
    <div className='playing-now-drawer'>
      <Drawer open={open}>
        <YourLibrary />
      </Drawer>
    </div>
  );
});

LibraryDrawer.displayName = 'LibraryDrawer';
