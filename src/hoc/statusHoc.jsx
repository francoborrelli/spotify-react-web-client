import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class StatusHoc extends Component {
    render = () => (
      <ComposedComponent playTracks={this.playTracks} {...this.props} />
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

  return connect(mapStateToProps)(StatusHoc);
}
