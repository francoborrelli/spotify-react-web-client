import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setView } from '../store/actions/uiActions';
import { fetchPlaylist } from '../store/actions/playlistActions';
import { fetchArtist } from '../store/actions/artistActions';

export default function(ComposedComponent, reducers) {
  class UiChanger extends Component {
    onPlaylistClick = id => {
      this.props.fetchPlaylist(id);
      this.props.setView('playlist');
    };

    onArtistClick = id => {
      this.props.fetchArtist(id);
      this.props.setView('artist');
    };

    render = () => (
      <ComposedComponent
        {...this.props}
        onPlaylistClick={this.onPlaylistClick}
        onArtistClick={this.onArtistClick}
      />
    );
  }

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
    null,
    mapDispatchToProps
  )(UiChanger);
}
