import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setView } from '../store/actions/uiActions';
import { fetchPlaylist } from '../store/actions/playlistActions';
import { fetchArtist } from '../store/actions/artistActions';
import { fetchAlbum } from '../store/actions/albumActions';

export default function(ComposedComponent) {
  class UiHoc extends Component {
    onPlaylistClick = id => {
      this.props.fetchPlaylist(id);
      this.props.setView('playlist');
    };

    onArtistClick = id => {
      this.props.fetchArtist(id);
      this.props.setView('artist');
    };

    onAlbumClick = id => {
      this.props.fetchAlbum(id);
      this.props.setView('album');
    };

    render = () => (
      <ComposedComponent
        {...this.props}
        onPlaylistClick={this.onPlaylistClick}
        onArtistClick={this.onArtistClick}
        onAlbumClick={this.onAlbumClick}
      />
    );
  }

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        fetchPlaylist,
        fetchArtist,
        fetchAlbum,
        setView
      },
      dispatch
    );
  };

  return connect(
    null,
    mapDispatchToProps
  )(UiHoc);
}
