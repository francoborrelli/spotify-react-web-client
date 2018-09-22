import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  nextSong,
  previousSong,
  pauseSong,
  playSong,
  seekSong,
  shuffle,
  repeatContext
} from '../store/actions/playerActions';

export default function(ComposedComponent) {
  class PlayerHoc extends Component {
    render = () => (
      <ComposedComponent
        {...this.props}
        nextSong={this.props.nextSong}
        previousSong={this.props.previousSong}
        pauseSong={this.props.pauseSong}
        playSong={() => this.props.playSong()}
        seekSong={this.props.seekSong}
        shuffleSong={this.props.shuffle}
        repeatContext={this.props.repeatContext}
      />
    );
  }

  const mapStateToProps = state => {
    return {
      currentUri: state.playerReducer.status
        ? state.playerReducer.status.context.uri
        : null,
      currentSong: state.playerReducer.status
        ? state.playerReducer.status.track_window.current_track
        : {},
      trackPosition: state.playerReducer.status
        ? state.playerReducer.status.position
        : 0,
      playing: state.playerReducer.status
        ? !state.playerReducer.status.paused
        : false,
      shuffleActive: state.playerReducer.status
        ? state.playerReducer.status.shuffle
        : false,
      repeatActive: state.playerReducer.status
        ? state.playerReducer.status.repeat_mode !== 0
        : false
    };
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        nextSong,
        previousSong,
        pauseSong,
        playSong,
        seekSong,
        shuffle,
        repeatContext
      },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayerHoc);
}
