import { Col, Row, Space } from 'antd';
import AlbumSongDetails from './Album';
import { ExpandOutIcon } from '../Icons';
import VolumeControls from '../Layout/components/PlayingBar/Volume';
import ControlButtons from '../Layout/components/PlayingBar/ControlButtons';
import SongProgressBar from '../Layout/components/PlayingBar/SongProgressBar';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../Tooltip';
import { AddSongToLibraryButton } from '../Actions/AddSongToLibrary';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { spotifyActions } from '../../store/slices/spotify';

interface FullScreenPlayerProps {
  onExit: () => Promise<void>;
}

const ExpandOutButton: FC<FullScreenPlayerProps> = (props) => {
  const [t] = useTranslation(['playingBar']);
  return (
    <Tooltip title={t('Exit full screen')}>
      <button title={t('Exit full screen')} style={{ marginLeft: 20 }} onClick={props.onExit}>
        <ExpandOutIcon />
      </button>
    </Tooltip>
  );
};

const AddToLibrary = () => {
  const dispatch = useAppDispatch();
  const song = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track,
    (a, b) => a?.id === b?.id
  );
  const isLiked = useAppSelector((state) => state.spotify.liked);

  const handleToggle = () => {
    dispatch(spotifyActions.setLiked({ liked: !isLiked }));
  };

  return (
    <AddSongToLibraryButton size={20} isSaved={isLiked} id={song?.id!} onToggle={handleToggle} />
  );
};

export const FullScreenPlayer: FC<FullScreenPlayerProps> = (props) => {
  return (
    <div className='Full-screen-page'>
      <div></div>
      <div style={{ width: '100%', padding: 60 }}>
        <Row gutter={[24, 24]} justify='center' style={{ alignItems: 'baseline' }}>
          <Col span={24}>
            <AlbumSongDetails />
          </Col>
          <Col span={24}>
            <SongProgressBar />
          </Col>
          <Col span={8}>
            <AddToLibrary />
          </Col>
          <Col span={8}>
            <ControlButtons />
          </Col>
          <Col span={8} style={{ textAlign: 'end' }}>
            <Space>
              <VolumeControls />
              <ExpandOutButton onExit={props.onExit} />
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

FullScreenPlayer.displayName = 'FullScreenPlayer';
