import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchCurrentSong,
  nextSong,
  previousSong,
  pauseSong
} from '../store/actions/playerActions';

export default function(ComposedComponent) {
  class Player extends Component {
    render = () => (
      <ComposedComponent
        {...this.props}
        fetchCurrentSong={this.props.fetchCurrentSong}
        nextSong={this.props.nextSong}
        previousSong={this.props.previousSong}
        pauseSong={this.props.pauseSong}
      />
    );
  }

  const mapStateToProps = state => {
    return {
      currentSong: state.playerReducer.currentSong || {},
      playing: state.playerReducer.playing || true
    };
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        fetchCurrentSong,
        nextSong,
        previousSong,
        pauseSong
      },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Player);
}
