// Utils
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { Col } from 'antd';
import { LibraryTitle } from './Title';
import { LibraryFilters } from './Filters';
import PlaylistCardShort, { AlbumCardShort, ArtistCardShort } from './PlaylistCardShort';

// Redux
import { useAppSelector } from '../../../../store/store';
import { getLibraryItems } from '../../../../store/slices/yourLibrary';

const COLLAPSED_STYLE = {
  overflowY: 'scroll',
  height: '100%',
  marginLeft: -20,
  maxWidth: 340,
  marginRight: -20,
} as const;

const YourLibrary = () => {
  const navigate = useNavigate();
  const items = useAppSelector(getLibraryItems);
  const collapsed = useAppSelector((state) => state.ui.libraryCollapsed);

  const onClick = useCallback(
    (url: string) => {
      navigate(`/playlist/${url}`);
    },
    [navigate]
  );

  return (
    <div className={`Navigation-section library ${!collapsed ? 'open' : ''}`}>
      <LibraryTitle />

      {!collapsed ? <LibraryFilters /> : null}

      <div className='library-list-container'>
        <Col style={collapsed ? {} : COLLAPSED_STYLE}>
          <div style={{ overflowY: 'scroll', overflowX: 'hidden', height: 'calc(100vh - 290px)' }}>
            {items.map((item) => {
              if (item.type === 'artist') return <ArtistCardShort key={item.id} artist={item} />;
              if (item.type === 'album') return <AlbumCardShort key={item.id} album={item} />;
              return <PlaylistCardShort key={item.id} playlist={item} />;
            })}
          </div>
        </Col>
      </div>
    </div>
  );
};

export default YourLibrary;
