import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../playlist/components/header/playlistHeader';
import Table from '../../albumTable/albumTable';

class Album extends Component {
  render = () => {
    return (
      <div className="player-container">
        <Header playlist={this.props.album} album={true} />
        <Table
          tracks={this.props.album.tracks ? this.props.album.tracks : []}
        />
      </div>
    );
  };
}
const mapStateToProps = state => {
  return {
    album: state.albumReducer.currentAlbum || {}
  };
};

export default connect(mapStateToProps)(Album);
