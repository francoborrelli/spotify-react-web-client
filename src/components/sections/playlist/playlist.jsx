import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/header/playlistHeader';
import Table from '../../playlistTable/playlistTable';

class Playlist extends Component {
  render = () => {
    return (
      <div className="player-container">
        <Header playlist={this.props.playlist || {}} />
        <Table
          songs={this.props.playlist ? this.props.playlist.tracks.items : []}
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

export default connect(mapStateToProps)(Playlist);
