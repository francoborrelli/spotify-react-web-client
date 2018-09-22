import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/header/playlistHeader';
import Table from '../../songsTable/playlistTable/playlistTable';

import withStatus from '../../../hoc/statusHoc';

class Playlist extends Component {
  render = () => {
    return (
      <div className="player-container">
        <Header
          playlist={this.props.playlist || {}}
          currentUri={this.props.currentUri}
          playing={this.props.playing}
          pauseSong={this.props.pauseSong}
          playSong={() => this.props.playSong(this.props.playlist.uri, 0)}
        />
        <Table
          current={this.props.currentSong}
          playing={this.props.playing}
          uri={this.props.playlist ? this.props.playlist.uri : ''}
          songs={this.props.playlist ? this.props.playlist.tracks.items : []}
          pauseSong={this.props.pauseSong}
          playSong={this.props.playSong}
        />
      </div>
    );
  };
}
const mapStateToProps = state => {
  return {
    playlist: state.playlistReducer.playlist
      ? state.playlistReducer.playlist
      : null
  };
};

export default connect(mapStateToProps)(withStatus(Playlist));
