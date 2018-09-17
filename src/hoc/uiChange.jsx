import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setView } from '../store/actions/uiActions';
import { fetchPlaylist } from '../store/actions/playlistActions';
import { fetchArtist } from '../store/actions/artistActions';

export default function(ComposedComponent, reducers) {
  class UiChanger extends Component {
    onPlaylistClick = id => {
      const token = this.props.token;
      if (token) {
        this.props.fetchPlaylist(token, id);
        this.props.setView('playlist');
      }
    };
    onArtistClick = id => {
      const token = this.props.token;
      if (token) {
        console.log(this);
        this.props.fetchArtist(token, id);
        this.props.setView('artist');
      }
    };
    render = () => (
      <ComposedComponent
        {...this.props}
        onPlaylistClick={this.onPlaylistClick}
        onArtistClick={this.onArtistClick}
      />
    );
  }

  const mapStateToProps = state => {
    return {
      token: state.tokenReducer.token ? state.tokenReducer.token : ''
    };
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        fetchPlaylist,
        fetchArtist,
        setView
      },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(UiChanger);
}
