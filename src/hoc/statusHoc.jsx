import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { playSong, pauseSong } from '../store/actions/playerActions';

export default function(ComposedComponent) {
  class StatusHoc extends Component {
    render = () => (
      <ComposedComponent
        playTracks={this.playTracks}
        playSong={this.props.playSong}
        pauseSong={this.props.pauseSong}
        {...this.props}
      />
    );
  }

  const mapStateToProps = state => {
    return {
      currentUri: state.playerReducer.status
        ? state.playerReducer.status.context.uri
        : null,
      currentSong: state.playerReducer.status
        ? state.playerReducer.status.track_window.current_track.linked_from
            .id || state.playerReducer.status.track_window.current_track.id
        : null,
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

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(StatusHoc);
}