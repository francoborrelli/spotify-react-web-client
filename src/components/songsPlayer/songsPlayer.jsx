import React, { Component } from 'react';

import './songsPlayer.css';

import DetailSection from './components/detailsSection';
import SongsControl from './components/songsControl';
import Sider from './components/sider';
import withPlayer from '../../hoc/playerHoc';

class SongsPlayer extends Component {
  toSeconds = ms => ms / 1000;

  render = () => {
    const position = this.toSeconds(this.props.trackPosition) || 0;
    const duration = this.props.currentSong
      ? this.toSeconds(this.props.currentSong.duration_ms)
      : 1;

    return (
      <div className="player-container">
        {this.props.playing ? (
          <DetailSection
            songName={this.props.currentSong.name || ''}
            artists={this.props.currentSong.artists || []}
          />
        ) : null}
        <SongsControl
          nextSong={this.props.nextSong}
          previousSong={this.props.previousSong}
          pauseSong={this.props.pauseSong}
          playSong={this.props.playSong}
          playing={this.props.playing}
          shuffleSong={this.props.shuffle}
          repeatContext={this.props.repeatContext}
          shuffleActive={this.props.shuffleActive}
          repeatActive={this.props.repeatActive}
        />
        <Sider
          isEnabled
          value={position / duration}
          position={position}
          duration={duration}
          onChange={value =>
            this.props.seekSong(Math.round(value * duration * 1000))
          }
        />
      </div>
    );
  };
}

export default withPlayer(SongsPlayer);
