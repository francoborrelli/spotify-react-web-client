import SongDetails from './SongDetails';
import { getCurrentSongData, playingBarActions } from '../../../../store/slices/playingBar';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { Col, Row } from 'antd';
import { ListIcon, Pause, Play } from '../../../Icons';

// Redux
import { libraryActions } from '../../../../store/slices/library';

const PlayButton = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.spotify.state);
  const paused = state?.paused;
  return (
    <button
      onClick={() =>
        !paused ? dispatch(playingBarActions.setPause()) : dispatch(playingBarActions.setPlaying())
      }
    >
      {paused ? <Play /> : <Pause />}
    </button>
  );
};

const QueueButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(libraryActions.openQueue())}>
      <ListIcon />
    </button>
  );
};

const NowPlayingBarMobile = () => {
  const currentSongData = useAppSelector(getCurrentSongData);
  const state = useAppSelector((state) => state.spotify.state);

  const currentTime = state?.position || 0;
  const duration = state?.duration || 1;

  return (
    <div>
      <div
        className='mobile-player'
        style={{
          background: `linear-gradient(${currentSongData.color} -50%, rgb(18, 18, 18) 300%)`,
        }}
      >
        <Row justify='space-between'>
          <Col>
            <SongDetails />
          </Col>
          <Col style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                minWidth: 50,
                marginRight: 5,
                justifyContent: 'space-between',
              }}
            >
              <QueueButton />
              <PlayButton />
            </div>
          </Col>
        </Row>
        <div className='time-line'>
          <div
            className='current-time'
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBarMobile;
