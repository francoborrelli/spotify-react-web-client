// Components
import { Col } from 'antd';
import { LibraryTitle } from '../Title';
import { ListItemComponent } from './ListCards';
import { CompactItemComponent } from './CompactCards';
import { LibraryFilters, SearchArea } from '../Filters';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getLibraryItems } from '../../../../../store/slices/yourLibrary';
import { GridItemComponent } from '../../../../Lists/list';
import { memo, useMemo } from 'react';
import { isActiveOnOtherDevice } from '../../../../../store/slices/spotify';
import useIsMobile from '../../../../../utils/isMobile';
import { getLibraryCollapsed, uiActions } from '../../../../../store/slices/ui';
import { LanguageButton } from '../Language';
import { LibraryLoginInfo } from './loginInfo';

const COLLAPSED_STYLE = {
  overflowY: 'scroll',
  height: '100%',
} as const;

const YourLibrary = () => {
  const collapsed = useAppSelector(getLibraryCollapsed);
  const user = useAppSelector((state) => !!state.auth.user);
  const activeOnOtherDevice = useAppSelector(isActiveOnOtherDevice);

  const heightValue = useMemo(() => {
    let value = 310;
    if (!user) value = 270;
    if (collapsed) value = 218;
    if (activeOnOtherDevice) value += 50;
    return value;
  }, [user, collapsed, activeOnOtherDevice]);

  return (
    <div className={`Navigation-section library ${!collapsed ? 'open' : ''}`}>
      <LibraryTitle />

      {!collapsed && user ? <LibraryFilters /> : null}

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
            {!user ? <AnonymousContent /> : <LoggedContent />}
          </div>

          {!user ? (
            <div style={{ marginLeft: 10 }}>
              <LanguageButton />
            </div>
          ) : null}
        </Col>
      </div>
    </div>
  );
};

const AnonymousContent = () => {
  return <LibraryLoginInfo />;
};

const LoggedContent = memo(() => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const items = useAppSelector(getLibraryItems);
  const collapsed = useAppSelector(getLibraryCollapsed);
  const view = useAppSelector((state) => state.yourLibrary.view);

  return (
    <>
      {!collapsed ? <SearchArea /> : null}

      <div
        className={`${collapsed ? 'collapsed' : ''} ${
          !collapsed && view === 'GRID' ? 'grid-view' : ''
        }`}
      >
        {items.map((item) => {
          if (collapsed) return <ListItemComponent key={item.id} item={item} />;

          return (
            <div
              key={item.id}
              onClick={isMobile ? () => dispatch(uiActions.collapseLibrary()) : undefined}
            >
              {view === 'LIST' ? <ListItemComponent key={item.id} item={item} /> : ''}
              {view === 'COMPACT' ? <CompactItemComponent key={item.id} item={item} /> : ''}
              {view === 'GRID' ? <GridItemComponent key={item.id} item={item} /> : ''}
            </div>
          );
        })}
      </div>
    </>
  );
});

export default YourLibrary;
