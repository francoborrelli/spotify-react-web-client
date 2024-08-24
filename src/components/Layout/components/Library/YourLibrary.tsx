// Icons
import { LibraryCollapsedIcon, LibraryIcon } from '../../../Icons';

// Utils
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { Col, Space } from 'antd';
import { Tooltip } from '../../../Tooltip';
import PlaylistCardShort from './PlaylistCardShort';

// I18n
import { LanguageButton } from './Language';
import { useTranslation } from 'react-i18next';

// Redux
import { libraryActions } from '../../../../store/slices/library';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

// Interfaces
import type { Playlist } from '../../../../interfaces/types';

const Title = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['navbar']);
  const collapsed = useAppSelector((state) => state.library.collapsed);

  if (collapsed) {
    return (
      <Tooltip placement='right' title={t('Expand your library')}>
        <button
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          onClick={() => dispatch(libraryActions.toggleLibrary())}
        >
          <LibraryCollapsedIcon />
        </button>
      </Tooltip>
    );
  }

  return (
    <Space wrap>
      <Tooltip placement='top' title={t('Collapse your library')}>
        <button onClick={() => dispatch(libraryActions.toggleLibrary())}>
          <LibraryIcon />
        </button>
      </Tooltip>
      <span className='Navigation-button'>{t('Your Library')}</span>
    </Space>
  );
});

const YourLibrary = ({ playlists }: { playlists: Playlist[] }) => {
  const navigate = useNavigate();
  const collapsed = useAppSelector((state) => state.library.collapsed);

  const onClick = useCallback(
    (url: string) => {
      navigate(`/playlist/${url}`);
    },
    [navigate]
  );

  return (
    <div className={`Navigation-section library ${!collapsed ? 'open' : ''}`}>
      <Title />

      <div className='library-list-container'>
        <Col
          style={
            collapsed ? {} : ({ overflowY: 'scroll', height: '100%', marginLeft: -20 } as const)
          }
        >
          <div
            style={collapsed ? { overflowY: 'scroll', overflowX: 'hidden', height: '100%' } : {}}
          >
            {playlists.map((playlist: Playlist, index: number) => {
              return (
                <PlaylistCardShort
                  key={playlist.name}
                  playlist={playlist}
                  onClick={() => {
                    onClick(playlist.name.toLowerCase());
                  }}
                />
              );
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
