import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/header/artistHeader';

class Artist extends Component {
  render = () => <Header artist={this.props.artist} />;
}

const mapStateToProps = state => {
  return {
    artist: state.artistReducer.currentArtist
      ? state.artistReducer.currentArtist
      : {}
  };
};

export default connect(mapStateToProps)(Artist);
