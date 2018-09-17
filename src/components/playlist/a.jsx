import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/playlistHeader';
import S from './playlist';

class Playlist extends Component {
  render = () => {
    return (
      <div className="player-container">
        <Header playlist={this.props.playlist || {}} />
        <S
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
