// Components
import { Col } from 'antd';
import { LibraryTitle } from '../Title';
import { ListItemComponent } from './ListCards';
import { CompactItemComponent } from './CompactCards';
import { LibraryFilters, SearchArea } from '../Filters';

// Redux
import { useAppSelector } from '../../../../../store/store';
import { getLibraryItems } from '../../../../../store/slices/yourLibrary';

const COLLAPSED_STYLE = {
  overflowY: 'scroll',
  height: '100%',
  marginLeft: -20,
  maxWidth: 340,
  marginRight: -20,
} as const;

const YourLibrary = () => {
  const items = useAppSelector(getLibraryItems);
  const view = useAppSelector((state) => state.yourLibrary.view);
  const collapsed = useAppSelector((state) => state.ui.libraryCollapsed);

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
              height: collapsed ? 'calc(100vh - 220px)' : 'calc(100vh - 275px)',
            }}
          >
            {!collapsed ? <SearchArea /> : null}

            {items.map((item) => (
              <div key={item.id}>
                {view === 'LIST' ? <ListItemComponent key={item.id} item={item} /> : ''}
                {view === 'COMPACT' ? <CompactItemComponent key={item.id} item={item} /> : ''}
              </div>
            ))}
          </div>
        </Col>
      </div>
    </div>
  );
};

export default YourLibrary;
