import { useEffect, useState, type FC, type ReactElement } from 'react';

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
import { spotifyActions } from '../../store/slices/spotify';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { isRightLayoutOpen, uiActions } from '../../store/slices/ui';

export const AppLayout: FC<{ children: ReactElement }> = (props) => {
  const dispatch = useAppDispatch();

  const rightLayoutOpen = useAppSelector(isRightLayoutOpen);
  const libraryCollapsed = useAppSelector((state) => state.ui.libraryCollapsed);

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
    dispatch(spotifyActions.fetchDevices());
  }, [dispatch]);

  return (
    <>
      {/* Modals & Drawers */}
      <LanguageModal />
      <LibraryDrawer />
      <PlayingNowDrawer />
      <EditPlaylistModal />

      {/* Main Component */}
      <div className='main-container'>
        <Row justify='end' gutter={[8, 8]} wrap style={{ height: 'calc(100vh - 106px)' }}>
          <Col span={24}>
            <Navbar />
          </Col>

          <Col span={24}>
            <PanelGroup direction='horizontal' autoSaveId='persistence'>
              <Panel
                id='left'
                order={1}
                className='mobile-hidden'
                minSize={isMobile ? 10 : libraryCollapsed ? 7 : 22}
                maxSize={isMobile ? 10 : libraryCollapsed ? 8 : 28}
                style={{
                  minWidth: libraryCollapsed ? 85 : 280,
                  maxWidth: libraryCollapsed ? 85 : undefined,
                }}
              >
                <Library />
              </Panel>

              <PanelResizeHandle className='resize-handler' />

              <Panel id='center' order={2}>
                {/* Home | Playlists */}
                {props.children}
              </Panel>

              {rightLayoutOpen ? <PanelResizeHandle className='resize-handler' /> : null}

              {rightLayoutOpen ? (
                <Panel minSize={23} maxSize={30} id='details-section' order={3}>
                  <PlayingNow />
                </Panel>
              ) : null}
            </PanelGroup>
          </Col>
        </Row>
      </div>

      {/* Player bar */}
      <footer>
        <PlayingBar />
      </footer>
    </>
  );
};

AppLayout.displayName = 'AppLayout';
