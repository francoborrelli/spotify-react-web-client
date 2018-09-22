import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../playlist/components/header/playlistHeader';
import Table from '../../songsTable/albumTable/albumTable';

import withStatus from '../../../hoc/statusHoc';

class Album extends Component {
  render = () => {
    return (
      <div className="player-container">
        <Header
          playlist={this.props.album}
          album={true}
          currentUri={this.props.currentUri}
          playing={this.props.playing}
          pauseSong={this.props.pauseSong}
          playSong={() => this.props.playSong(this.props.album.uri, 0)}
        />
        <Table
          tracks={this.props.album.tracks ? this.props.album.tracks : []}
          uri={this.props.album ? this.props.album.uri : ''}
          {...this.props}
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

export default connect(mapStateToProps)(withStatus(Album));
