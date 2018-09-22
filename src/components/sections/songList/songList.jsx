import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchSongs,
  fetchRecentSongs
} from '../../../store/actions/libraryActions';

import { playSong, pauseSong } from '../../../store/actions/playerActions';

import Playlist from '../../songsTable/playlistTable/playlistTable';
import Header from '../../header/songsHeader';

class SongsList extends Component {
  state = {
    fetch: false
  };
  componentDidMount() {
    this.fetchSongs();
  }

  componentDidUpdate() {
    this.fetchSongs();
  }

  fetchSongs() {
    const token = this.props.token;

    if (token !== '' && !this.state.fetch) {
      if (this.props.recently) {
        this.props.fetchRecentSongs(token);
      } else {
        this.props.fetchSongs(token);
      }
      this.setState({ fetch: true });
    }
  }

  getUri = () => `spotify:user:${this.props.user}:collection`;

  render = () => (
    <div className="player-container">
      <Header
        title={this.props.recently ? 'Recently Played' : 'Songs'}
        playSong={() => this.props.playSong(this.getUri(), 0)}
        pauseSong={this.props.pauseSong}
        playing={this.props.playing && this.getUri() === this.props.currentUri}
      />
      <Playlist
        songs={this.props.songs}
        playSong={this.props.playSong}
        pauseSong={this.props.pauseSong}
      />
    </div>
  );
}
const mapStateToProps = state => {
  return {
    token: state.sessionReducer.token ? state.sessionReducer.token : '',
    songs: state.libraryReducer.songs ? state.libraryReducer.songs.items : [],
    user: state.userReducer.user.id,
    currentUri: state.playerReducer.status
      ? state.playerReducer.status.context.uri
      : null,
    playing: state.playerReducer.status
      ? !state.playerReducer.status.paused
      : false
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSongs,
      fetchRecentSongs,
      playSong,
      pauseSong
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongsList);
