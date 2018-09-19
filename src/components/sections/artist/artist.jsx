import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/header/artistHeader';
import Popular from './components/popular/popular';

class Artist extends Component {
  render = () => (
    <div>
      <Header artist={this.props.artist} />
      <Popular
        tracks={
          this.props.artist.popularTracks ? this.props.artist.popularTracks : []
        }
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    artist: state.artistReducer.currentArtist
      ? state.artistReducer.currentArtist
      : {}
  };
};

export default connect(mapStateToProps)(Artist);
