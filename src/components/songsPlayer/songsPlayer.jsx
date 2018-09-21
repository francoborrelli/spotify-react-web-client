import React, { Component } from 'react';

import './songsPlayer.css';

import DetailSection from './components/detailsSection';
import SongsControl from './components/songsControl';
import Sider from './components/sider';
import withPlayer from '../../hoc/playerHoc';

class SongsPlayer extends Component {
  render = () => (
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
      />
      <Sider
        currentSong={this.props.currentSong}
        playing={this.props.playing}
        trackPosition={this.props.trackPosition}
      />
    </div>
  );
}

export default withPlayer(SongsPlayer);
