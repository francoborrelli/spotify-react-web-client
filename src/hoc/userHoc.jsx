import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { followArtist, unfollowArtist } from '../store/actions/artistActions';

export default function(ComposedComponent) {
  class Player extends Component {
    render = () => (
      <ComposedComponent
        {...this.props}
        followArtist={this.props.followArtist}
        unfollowArtist={this.props.unfollowArtist}
      />
    );
  }

  const mapStateToProps = state => {
    return {};
  };

  const mapDispatchToProps = dispatch => {
    return bindActionCreators({ followArtist, unfollowArtist }, dispatch);
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Player);
}
