import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './components/header/playlistHeader';
import Table from '../../songsTable/playlistTable/playlistTable';

import { pauseSong, playSong } from '../../../store/actions/playerActions';

class Playlist extends Component {
  render = () => {
    return (
      <div className="player-container">
        <Header
          playlist={this.props.playlist || {}}
          uri={this.props.playlist ? this.props.playlist.uri : ''}
          playSong={this.props.playSong}
        />
        <Table
          current={this.props.current}
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
      : null,
    current: state.playerReducer.status
      ? state.playerReducer.status.track_window.current_track.id
      : {},
    playing: state.playerReducer.status
      ? !state.playerReducer.status.paused
      : false
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      pauseSong,
      playSong
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
