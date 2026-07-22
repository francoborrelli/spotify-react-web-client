import { memo, useEffect, useState, type FC, type ReactElement } from 'react';

// Components
import { Col, Row } from 'antd';
import { Navbar } from './components/Navbar';
import { Library } from './components/Library';
import PlayingBar from './components/PlayingBar';
import { PlayingNow } from './components/NowPlaying';
import { LanguageModal } from '../Modals/LanguageModal';
import { LibraryDrawer } from '../Drawers/LibraryDrawer';
import { PlayingNowDrawer } from '../Drawers/PlayingNowDrawer';
import { EditPlaylistModal } from '../Modals/EditPlaylistModal';
import { Group, Panel, Separator, useDefaultLayout } from 'react-resizable-panels';

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';
import { isActiveOnOtherDevice, spotifyActions } from '../../store/slices/spotify';
import { getLibraryCollapsed, isRightLayoutOpen, uiActions } from '../../store/slices/ui';
import { LoginFooter } from './components/LoginFooter';
import { LoginModal } from '../Modals/LoginModal';
import useIsMobile from '../../utils/isMobile';

const pct = (value: number) => `${value}%`;

export const AppLayout: FC<{ children: ReactElement }> = memo((props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  const rightLayoutOpen = useAppSelector(isRightLayoutOpen);
  const libraryCollapsed = useAppSelector(getLibraryCollapsed);
  const hasState = useAppSelector((state) => !!state.spotify.state);
  const activeOnOtherDevice = useAppSelector(isActiveOnOtherDevice);

  const [isTablet, setIsTablet] = useState(false);

  const isMobile = useIsMobile();
  const showDetails = rightLayoutOpen && hasState;

  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: 'persistence',
    storage: localStorage,
    panelIds: showDetails ? ['left', 'center', 'details-section'] : ['left', 'center'],
  });

  useEffect(() => {
    window.onresize = () => {
      const vh = window.innerWidth;
      if (vh < 950) {
        dispatch(uiActions.collapseLibrary());
        setIsTablet(true);
      } else {
        setIsTablet(false);
      }
    };
    return () => {
      window.onresize = null;
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) dispatch(spotifyActions.fetchDevices());
  }, [user, dispatch]);

  // In v4, Panel `style` applies to an inner wrapper — min/max width there no longer
  // constrains the flex item, so unused outer width shows up as a gap. Use size props instead.
  const leftPanelSize = isTablet
    ? { minSize: pct(10), maxSize: pct(10), defaultSize: pct(10) }
    : libraryCollapsed
      ? { minSize: 85, maxSize: 85, defaultSize: 85 }
      : { minSize: 280, maxSize: pct(28), defaultSize: pct(22) };

  return (
    <>
      {/* Modals & Drawers */}
      <LanguageModal />
      <LibraryDrawer />
      <PlayingNowDrawer />
      <EditPlaylistModal />
      <LoginModal />

      {/* Main Component */}
      <div className='main-container'>
        <Row
          wrap
          justify='end'
          gutter={[8, 8]}
          style={{
            overflow: 'hidden',
            height: `calc(100vh - ${
              activeOnOtherDevice ? '141' : !user && isMobile ? '0' : '105'
            }px)`,
          }}
        >
          <Col span={24}>
            <Navbar />
          </Col>

          <Col
            span={24}
            style={{
              maxHeight: activeOnOtherDevice ? `calc(100vh - 185px)` : undefined,
            }}
          >
            <Group
              orientation='horizontal'
              defaultLayout={defaultLayout}
              onLayoutChanged={onLayoutChanged}
              style={{ height: '100%', width: '100%' }}
            >
              <Panel
                id='left'
                className='mobile-hidden'
                groupResizeBehavior={libraryCollapsed ? 'preserve-pixel-size' : 'preserve-relative-size'}
                {...leftPanelSize}
                style={{ borderRadius: 5 }}
              >
                <Library />
              </Panel>

              {!isMobile ? <Separator className='resize-handler' /> : null}

              <Panel id='center' style={{ borderRadius: 5 }}>
                {/* Home | Playlists */}
                {props.children}
              </Panel>

              {showDetails ? (
                <>
                  {!isTablet ? <Separator className='resize-handler' /> : null}
                  <Panel
                    id='details-section'
                    minSize={pct(23)}
                    maxSize={pct(30)}
                    defaultSize={pct(25)}
                    style={{ borderRadius: 5 }}
                  >
                    <PlayingNow />
                  </Panel>
                </>
              ) : null}
            </Group>
          </Col>
        </Row>
      </div>

      {<footer>{user ? <PlayingBar /> : <LoginFooter />}</footer>}
    </>
  );
});

AppLayout.displayName = 'AppLayout';
