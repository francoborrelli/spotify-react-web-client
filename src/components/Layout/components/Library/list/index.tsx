// Components
import { Col } from 'antd';
import { LibraryTitle } from '../Title';
import { ListItemComponent } from './ListCards';
import { CompactItemComponent } from './CompactCards';
import { LibraryFilters, SearchArea } from '../Filters';

// Redux
import { useAppSelector } from '../../../../../store/store';
import { getLibraryItems } from '../../../../../store/slices/yourLibrary';
import { GridItemComponent } from '../../../../Lists/list';
import { useMemo } from 'react';
import { isActiveOnOtherDevice } from '../../../../../store/slices/spotify';

const COLLAPSED_STYLE = {
  overflowY: 'scroll',
  height: '100%',
} as const;

const YourLibrary = () => {
  const items = useAppSelector(getLibraryItems);
  const view = useAppSelector((state) => state.yourLibrary.view);
  const activeOnOtherDevice = useAppSelector(isActiveOnOtherDevice);
  const collapsed = useAppSelector((state) => state.ui.libraryCollapsed);

  const heightValue = useMemo(() => {
    let value = 275;
    if (collapsed) value = 210;
    if (activeOnOtherDevice) value += 50;
    return value;
  }, [collapsed, activeOnOtherDevice]);

  return (
    <div className={`Navigation-section library ${!collapsed ? 'open' : ''}`}>
      <LibraryTitle />

      {!collapsed ? <LibraryFilters /> : null}

      <div className='library-list-container'>
        <Col style={collapsed ? {} : COLLAPSED_STYLE}>
          <div
            className='library-list'
            style={{
              overflowY: 'scroll',
              overflowX: 'hidden',
              height: `calc(100vh - ${heightValue}px`,
            }}
          >
            {!collapsed ? <SearchArea /> : null}

            <div
              className={`${collapsed ? 'collapsed' : ''} ${
                !collapsed && view === 'GRID' ? 'grid-view' : ''
              }`}
            >
              {items.map((item) => {
                if (collapsed) return <ListItemComponent key={item.id} item={item} />;

                return (
                  <div key={item.id}>
                    {view === 'LIST' ? <ListItemComponent key={item.id} item={item} /> : ''}
                    {view === 'COMPACT' ? <CompactItemComponent key={item.id} item={item} /> : ''}
                    {view === 'GRID' ? <GridItemComponent key={item.id} item={item} /> : ''}
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default YourLibrary;
