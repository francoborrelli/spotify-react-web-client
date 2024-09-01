import { Col, Row } from 'antd';
import { Pause, Play, Replay, ReplayOne, ShuffleIcon, SkipBack, SkipNext } from '../../../Icons';

// Utils
import { useAppSelector } from '../../../../store/store';

// Services
import { playerService } from '../../../../services/player';

const ShuffleButton = () => {
  const state = useAppSelector((state) => state.spotify.state);
  const shuffle = state?.shuffle;
  return (
    <button onClick={() => playerService.toggleShuffle(!shuffle).then()}>
      <ShuffleIcon active={!!shuffle} />
    </button>
  );
};

const SkipBackButton = () => {
  const state = useAppSelector((state) => state.spotify.state);
  const hasContext = !!state?.context.uri;
  return (
    <button
      className={!hasContext ? 'disabled' : ''}
      onClick={() => hasContext && playerService.previousTrack().then()}
    >
      <SkipBack />
    </button>
  );
};

const PlayButton = () => {
  const state = useAppSelector((state) => state.spotify.state);
  const isPlaying = !state?.paused;
  const hasContext = !!state?.context.uri;

  return (
    <button
      className={`player-pause-button ${!hasContext ? 'disabled' : ''}`}
      onClick={() => {
        if (hasContext) {
          return isPlaying
            ? playerService.pausePlayback().then()
            : playerService.startPlayback().then();
        }
      }}
    >
      {!isPlaying ? <Play /> : <Pause />}
    </button>
  );
};

const SkipNextButton = () => {
  const state = useAppSelector((state) => state.spotify.state);
  const hasContext = !!state?.context.uri;
  return (
    <button
      className={!hasContext ? 'disabled' : ''}
      onClick={() => hasContext && playerService.nextTrack().then()}
    >
      <SkipNext />
    </button>
  );
};

const ReplayButton = () => {
  const state = useAppSelector((state) => state.spotify.state);
  const looping = state?.repeat_mode === 1 || state?.repeat_mode === 2;
  return (
    <button
      className={state?.repeat_mode === 2 ? 'active-icon-button' : ''}
      onClick={() =>
        playerService.setRepeatMode(
          state?.repeat_mode === 2 ? 'off' : state?.repeat_mode === 1 ? 'track' : 'context'
        )
      }
    >
      {state?.repeat_mode === 2 ? <ReplayOne active /> : <Replay active={looping} />}
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
