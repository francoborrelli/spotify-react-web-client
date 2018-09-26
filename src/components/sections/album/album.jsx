import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../playlist/components/header/playlistHeader';
import Table from '../../songsTable/albumTable/albumTable';
import Spinner from '../../spinner/spinner';
import withStatus from '../../../hoc/statusHoc';

class Album extends Component {
  render = () => {
    return (
      <Spinner section loading={this.props.fetching}>
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
            songs={this.props.album.tracks ? this.props.album.tracks : []}
            uri={this.props.album ? this.props.album.uri : ''}
            {...this.props}
          />
        </div>
      </Spinner>
    );
  };
}
const mapStateToProps = state => {
  return {
    album: state.albumReducer.currentAlbum || {},
    fetching: state.albumReducer.fetchAlbumPending
  };
};

export default connect(mapStateToProps)(withStatus(Album));
