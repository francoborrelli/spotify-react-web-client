import { Col, Row } from 'antd';
import { Pause, Play, Replay, ShuffleIcon, SkipBack, SkipNext } from '../../../Icons';

// Utils
import { playingBarActions } from '../../../../store/slices/playingBar';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const ShuffleButton = () => {
  return (
    <button>
      <ShuffleIcon />
    </button>
  );
};

const SkipBackButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(playingBarActions.previousSong())}>
      <SkipBack />
    </button>
  );
};

const PlayButton = () => {
  const dispatch = useAppDispatch();
  const { playing } = useAppSelector((state) => state.playingBar);
  return (
    <button
      className='player-pause-button'
      onClick={() =>
        playing ? dispatch(playingBarActions.setPause()) : dispatch(playingBarActions.setPlaying())
      }
    >
      {!playing ? <Play /> : <Pause />}
    </button>
  );
};

const SkipNextButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(playingBarActions.previousSong())}>
      <SkipNext />
    </button>
  );
};

const ReplayButton = () => {
  const dispatch = useAppDispatch();
  const { looping } = useAppSelector((state) => state.playingBar);
  return (
    <button
      className={looping ? 'active-icon-button' : ''}
      onClick={() => dispatch(playingBarActions.toggleLooping())}
    >
      <Replay active={looping} />
    </button>
  );
};

const CONTROLS = [ShuffleButton, SkipBackButton, PlayButton, SkipNextButton, ReplayButton];

const ControlButtons = () => {
  return (
    <Row gutter={24} align='middle' style={{ justifyContent: 'center' }}>
      {CONTROLS.map((Component, index) => (
        <Col key={index}>
          <Component />
        </Col>
      ))}
    </Row>
  );
};

export default ControlButtons;
