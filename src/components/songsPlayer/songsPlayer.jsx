import React, { Component } from 'react';

import './songsPlayer.css';

import DetailSection from './components/detailsSection';
import SongsControl from './components/songsControl';
import SongSider from './components/songSider';
import VolumeControl from './components/volumeControl';
import withPlayer from '../../hoc/playerHoc';

class SongsPlayer extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.pressSpace);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.pressSpace);
  }

  pressSpace = e => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (this.props.playing) {
        this.props.pauseSong();
      } else {
        this.props.playSong();
      }
    }
  };

  toSeconds = ms => ms / 1000;

  render = () => {
    const position = this.toSeconds(this.props.trackPosition) || 0;
    const duration = this.props.currentSong
      ? this.toSeconds(this.props.currentSong.duration_ms)
      : 1;

    return (
      <div className="player-container">
        {this.props.currentSong.id ? (
          <DetailSection
            songName={this.props.currentSong.name || ''}
            album={this.props.currentSong.album.uri.split(':')[2]}
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
        <SongSider
          isEnabled
          value={position / duration}
          position={position}
          duration={duration}
          onChange={value =>
            this.props.seekSong(Math.round(value * duration * 1000))
          }
        />
        <VolumeControl />
      </div>
    );
  };
}

export default withPlayer(SongsPlayer);
