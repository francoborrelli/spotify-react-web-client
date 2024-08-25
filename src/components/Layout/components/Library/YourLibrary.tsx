// Utils
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { Col } from 'antd';
import PlaylistCardShort, { AlbumCardShort } from './PlaylistCardShort';

// I18n
import { LanguageButton } from './Language';

// Redux
import { useAppSelector } from '../../../../store/store';

// Interfaces
import type { Playlist } from '../../../../interfaces/types';
import { LibraryTitle } from './Title';
import { getLibraryItems } from '../../../../store/slices/yourLibrary';

const YourLibrary = () => {
  const navigate = useNavigate();
  const items = useAppSelector(getLibraryItems);
  const collapsed = useAppSelector((state) => state.yourLibrary.collapsed);

  const onClick = useCallback(
    (url: string) => {
      navigate(`/playlist/${url}`);
    },
    [navigate]
  );

  return (
    <div className={`Navigation-section library ${!collapsed ? 'open' : ''}`}>
      <LibraryTitle />

      <div className='library-list-container'>
        <Col
          style={
            collapsed
              ? {}
              : ({
                  overflowY: 'scroll',
                  height: '100%',
                  marginLeft: -20,
                  maxWidth: 320,
                  marginRight: -20,
                } as const)
          }
        >
          <div
            style={
              collapsed
                ? { overflowY: 'scroll', overflowX: 'hidden', height: 'calc(100vh - 290px)' }
                : { overflowY: 'scroll', overflowX: 'hidden', height: 'calc(100vh - 290px)' }
            }
          >
            {items.map((item) => {
              if (item.type === 'artist') return null;
              if (item.type === 'album') return <AlbumCardShort key={item.id} album={item} />;
              return <PlaylistCardShort key={item.id} playlist={item} />;
            })}
          </div>
        </Col>
        <Col style={{ maxHeight: 40 }}>
          <LanguageButton />
        </Col>
      </div>
    </div>
  );
};

export default YourLibrary;
