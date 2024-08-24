import SongDetails from './SongDetails';
import { getCurrentSongData, playingBarActions } from '../../../../store/slices/playingBar';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { Col, Row } from 'antd';
import { ListIcon, Pause, Play } from '../../../Icons';
import { libraryActions } from '../../../../store/slices/library';

const PlayButton = () => {
  const dispatch = useAppDispatch();
  const { playing } = useAppSelector((state) => state.playingBar);
  return (
    <button
      onClick={() =>
        playing ? dispatch(playingBarActions.setPause()) : dispatch(playingBarActions.setPlaying())
      }
    >
      {!playing ? <Play /> : <Pause />}
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
  const duration = useAppSelector((state) => state.playingBar.duration);
  const currentTime = useAppSelector((state) => state.playingBar.currentTime);

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
