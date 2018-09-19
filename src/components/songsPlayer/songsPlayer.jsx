import React, { Component } from 'react';

import './songsPlayer.css';

import DetailSection from './ components/detailsSection';
import SongsControl from './ components/songsControl';
import withPlayer from '../../hoc/player';

class SongsPlayer extends Component {
  state = {
    fetch: false
  };

  componentDidUpdate() {
    if (!this.state.fetch) {
      this.props.fetchCurrentSong();
      this.setState({ fetch: true });
    }
  }

  render = () => (
    <div className="player-container">
      {this.props.playing ? (
        <DetailSection
          songName={this.props.currentSong.name}
          artists={this.props.currentSong.artists || []}
        />
      ) : null}
      <SongsControl
        nextSong={this.props.nextSong}
        previousSong={this.props.previousSong}
      />
    </div>
  );
}

export default withPlayer(SongsPlayer);
