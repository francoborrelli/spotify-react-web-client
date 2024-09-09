import { Col, Row } from 'antd';
import { Pause, Play, Replay, ReplayOne, ShuffleIcon, SkipBack, SkipNext } from '../../../Icons';

// Utils
import { useAppSelector } from '../../../../store/store';

// Services
import { playerService } from '../../../../services/player';
import { memo } from 'react';

const ShuffleButton = memo(() => {
  const shuffle = useAppSelector((state) => state.spotify.state?.shuffle);
  return (
    <button onClick={() => playerService.toggleShuffle(!shuffle).then()}>
      <ShuffleIcon active={!!shuffle} />
    </button>
  );
});

const SkipBackButton = memo(() => {
  const disabled = useAppSelector(
    (state) => !state.spotify.state || state?.spotify.state.disallows.skipping_prev
  );
  return (
    <button
      className={disabled ? 'disabled' : ''}
      onClick={() => !disabled && playerService.previousTrack().then()}
    >
      <SkipBack />
    </button>
  );
});

const PlayButton = memo(() => {
  const isPlaying = useAppSelector((state) => !state.spotify.state?.paused);
  const disabled = useAppSelector(
    (state) =>
      !state.spotify.state ||
      (state.spotify.state?.disallows.pausing && state.spotify.state?.disallows.resuming)
  );

  return (
    <button
      className={`player-pause-button ${disabled ? 'disabled' : ''}`}
      onClick={() => {
        if (!disabled) {
          return isPlaying
            ? playerService.pausePlayback().then()
            : playerService.startPlayback().then();
        }
      }}
    >
      {!isPlaying ? <Play /> : <Pause />}
    </button>
  );
});

const SkipNextButton = memo(() => {
  const disabled = useAppSelector(
    (state) => !state.spotify.state || state.spotify.state?.disallows.skipping_next
  );
  return (
    <button
      className={disabled ? 'disabled' : ''}
      onClick={() => !disabled && playerService.nextTrack().then()}
    >
      <SkipNext />
    </button>
  );
});

const ReplayButton = memo(() => {
  const repeat_mode = useAppSelector((state) => state.spotify.state?.repeat_mode);
  const looping = repeat_mode === 1 || repeat_mode === 2;
  return (
    <button
      className={repeat_mode === 2 ? 'active-icon-button' : ''}
      onClick={() =>
        playerService.setRepeatMode(
          repeat_mode === 2 ? 'off' : repeat_mode === 1 ? 'track' : 'context'
        )
      }
    >
      {repeat_mode === 2 ? <ReplayOne active /> : <Replay active={looping} />}
    </button>
  );
});

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
