import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { followArtist, unfollowArtist } from '../store/actions/artistActions';
import {
  followPlaylist,
  unfollowPlaylist
} from '../store/actions/playlistActions';

export default function(ComposedComponent) {
  class UserActions extends Component {
    render = () => (
      <ComposedComponent
        followArtist={this.props.followArtist}
        unfollowArtist={this.props.unfollowArtist}
        followPlaylist={this.props.followPlaylist}
        unfollowPlaylist={this.props.unfollowPlaylist}
        {...this.props}
      />
    );
  }

  const mapStateToProps = state => {
    return {};
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      { followArtist, unfollowArtist, followPlaylist, unfollowPlaylist },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserActions);
}
