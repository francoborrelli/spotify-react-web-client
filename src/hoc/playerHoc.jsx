import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchPlayerStatus,
  fetchCurrentSong,
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
        fetchCurrentSong={this.props.fetchCurrentSong}
        nextSong={this.props.nextSong}
        previousSong={this.props.previousSong}
        pauseSong={this.props.pauseSong}
        playSong={this.props.playSong}
      />
    );
  }

  const mapStateToProps = state => {
    return {
      currentSong: state.playerReducer.currentSong || {},
      playing: state.playerReducer.status
        ? state.playerReducer.status.is_playing
        : false
    };
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        fetchPlayerStatus,
        fetchCurrentSong,
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
