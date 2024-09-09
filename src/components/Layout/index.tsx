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
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// Interfaces

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';
import { isActiveOnOtherDevice, spotifyActions } from '../../store/slices/spotify';
import { getLibraryCollapsed, isRightLayoutOpen, uiActions } from '../../store/slices/ui';
import { LoginFooter } from './components/LoginFooter';
import { LoginModal } from '../Modals/LoginModal';

export const AppLayout: FC<{ children: ReactElement }> = memo((props) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => !!state.auth.user);
  const rightLayoutOpen = useAppSelector(isRightLayoutOpen);
  const libraryCollapsed = useAppSelector(getLibraryCollapsed);
  const hasState = useAppSelector((state) => !!state.spotify.state);
  const activeOnOtherDevice = useAppSelector(isActiveOnOtherDevice);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.onresize = () => {
      const vh = window.innerWidth;
      if (vh < 950) {
        dispatch(uiActions.collapseLibrary());
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    return () => {
      window.onresize = null;
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) dispatch(spotifyActions.fetchDevices());
  }, [user, dispatch]);

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
            height: `calc(100vh - ${activeOnOtherDevice ? '141' : '107'}px)`,
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
            <PanelGroup direction='horizontal' autoSaveId='persistence'>
              <Panel
                id='left'
                order={1}
                className='mobile-hidden'
                minSize={isMobile ? 10 : libraryCollapsed ? 7 : 22}
                maxSize={isMobile ? 10 : libraryCollapsed ? 8 : 28}
                defaultSize={isMobile ? 10 : libraryCollapsed ? 7 : 22}
                style={{
                  borderRadius: 5,
                  minWidth: libraryCollapsed ? 85 : 280,
                  maxWidth: libraryCollapsed ? 85 : undefined,
                }}
              >
                <Library />
              </Panel>

              <PanelResizeHandle className='resize-handler' />

              <Panel id='center' order={2} style={{ borderRadius: 5 }}>
                {/* Home | Playlists */}
                {props.children}
              </Panel>

              {rightLayoutOpen && hasState ? (
                <PanelResizeHandle className='resize-handler' />
              ) : null}

              {rightLayoutOpen && hasState ? (
                <Panel
                  order={3}
                  minSize={23}
                  maxSize={30}
                  defaultSize={25}
                  id='details-section'
                  style={{ borderRadius: 5 }}
                >
                  <PlayingNow />
                </Panel>
              ) : null}
            </PanelGroup>
          </Col>
        </Row>
      </div>

      {<footer>{user ? <PlayingBar /> : <LoginFooter />}</footer>}
    </>
  );
});

AppLayout.displayName = 'AppLayout';
