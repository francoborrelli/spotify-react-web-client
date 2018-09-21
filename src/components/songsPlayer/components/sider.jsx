import React, { Component } from 'react';

import { Slider, Direction, FormattedTime } from 'react-player-controls';

const SliderBar = ({ direction, value, style }) => <div style={style} />;
const SliderHandle = ({ direction, value, style }) => <div style={style} />;

class Sider extends Component {
  shouldComponentUpdate() {
    return this.props.playing;
  }

  toSeconds = ms => ms / 1000;

  render() {
    const position = this.props.trackPosition || 0;
    const duration = this.props.currentSong
      ? this.props.currentSong.duration_ms
      : 0;

    return (
      <div className="song-sider-container">
        <FormattedTime numSeconds={this.toSeconds(position) || 0} />
        <Slider
          className="song-sider"
          isEnabled={true}
          direction={Direction.Horizontal}
          onChange={newValue => {}}
        >
          <SliderBar
            direction={Direction.Horizontal}
            value={0.05}
            style={{ background: true ? '#72d687' : '#878c88' }}
          />
          <SliderBar
            direction={Direction.Horizontal}
            style={{ background: 'rgba(0, 0, 0, 0.05)' }}
          />
          <SliderHandle
            direction={Direction.Horizontal}
            value={0.5}
            style={{ background: true ? '#72d687' : '#878c88' }}
          />
        </Slider>
        <FormattedTime numSeconds={this.toSeconds(duration) || 0} />
      </div>
    );
  }
}

export default Sider;
