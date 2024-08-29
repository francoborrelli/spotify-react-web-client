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

export const AddPlaylistButton = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { t } = useTranslation(['navbar']);

  const onClick = () => {
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
      menu={{
        items: [
          {
            key: 'create',
            icon: <NewPlaylistIcon />,
            label: t('Create a new Playlist'),
            onClick,
          },
        ],
      }}
    >
      <button className='addButton'>
        <AddIcon />
      </button>
    </Dropdown>
  );
});
