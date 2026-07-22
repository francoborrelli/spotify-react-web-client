// Components
import { Dropdown, message } from 'antd';
import { AddIcon, NewPlaylistIcon } from '../../../Icons';

// Utils
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

// I18n
import { useTranslation } from 'react-i18next';

// Services
import { playlistService } from '../../../../services/playlists';

// Redux
import { fetchMyPlaylists } from '../../../../store/slices/yourLibrary';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';

export const AddPlaylistButton = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(
    (state) => state.auth.user,
    (prev, next) => prev?.id === next?.id
  );

  const { t } = useTranslation(['navbar']);

  const onClick = () => {
    if (!user) return dispatch(uiActions.openLoginTooltip());
    playlistService.createPlaylist(user?.id!, { name: t('My Playlist') }).then((playlist) => {
      message.success(t('Playlist created'));
      dispatch(fetchMyPlaylists());
      navigate(`/playlist/${playlist.data.id}`);
    });
  };

  return (
    <Dropdown
      placement='bottomRight'
      trigger={['click']}
      rootClassName='create-playlist-dropdown'
      menu={{
        items: [
          {
            key: 'create',
            onClick,
            label: (
              <div className='create-playlist-menu-item'>
                <div className='create-playlist-menu-item__icon'>
                  <NewPlaylistIcon
                    className='create-playlist-menu-item__svg'
                    style={{
                      height: 20,
                      maxWidth: 20,
                      cursor: 'default',
                    }}
                  />
                </div>
                <div className='create-playlist-menu-item__text'>
                  <span className='create-playlist-menu-item__title'>{t('Playlist')}</span>
                  <span className='create-playlist-menu-item__description'>
                    {t('Create a playlist with songs or episodes')}
                  </span>
                </div>
              </div>
            ),
          },
        ],
      }}
    >
      <button className='addButton add-playlist-button' aria-label={t('Create a new Playlist')}>
        <AddIcon />
      </button>
    </Dropdown>
  );
});
