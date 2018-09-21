import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  nextSong,
  previousSong,
  pauseSong,
  playSong
} from '../store/actions/playerActions';

export default function(ComposedComponent) {
  class PlayerHoc extends Component {
    render = () => (
      <ComposedComponent
        {...this.props}
        nextSong={this.props.nextSong}
        previousSong={this.props.previousSong}
        pauseSong={this.props.pauseSong}
        playSong={this.props.playSong}
      />
    );
  }

  const mapStateToProps = state => {
    return {
      currentSong: state.playerReducer.status
        ? state.playerReducer.status.track_window.current_track
        : {},
      playing: state.playerReducer.status
        ? !state.playerReducer.status.paused
        : false
    };
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        nextSong,
        previousSong,
        pauseSong,
        playSong
      },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayerHoc);
}
