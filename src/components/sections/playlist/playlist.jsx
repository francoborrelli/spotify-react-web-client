import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/header/playlistHeader';
import Table from '../../songsTable/playlistTable/playlistTable';

import withStatus from '../../../hoc/statusHoc';
import Spinner from '../../spinner/spinner';

class Playlist extends Component {
  render = () => {
    const id = this.props.playlist ? this.props.playlist.id : null;
    return (
      <Spinner
        section
        loading={!(id === this.props.playlistId && !this.props.fetching)}
      >
        <div className="player-container">
          <Header
            playlist={this.props.playlist || {}}
            currentUri={this.props.currentUri}
            playing={this.props.playing}
            pauseSong={this.props.pauseSong}
            playSong={() => this.props.playSong(this.props.playlist.uri, 0)}
          />
          <Table
            current={this.props.currentSong}
            playing={this.props.playing}
            uri={this.props.playlist ? this.props.playlist.uri : ''}
            songs={this.props.playlist ? this.props.playlist.tracks.items : []}
            pauseSong={this.props.pauseSong}
            playSong={this.props.playSong}
          />
        </div>
      </Spinner>
    );
  };
}
const mapStateToProps = state => {
  return {
    playlist: state.playlistReducer.playlist
      ? state.playlistReducer.playlist
      : null,
    playlistId: state.uiReducer.id,
    fetching: state.playlistReducer.fetchPlaylistPending
  };
};

export default connect(mapStateToProps)(withStatus(Playlist));
