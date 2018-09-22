import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../../../axios';

import {
  fetchSongs,
  fetchRecentSongs
} from '../../../store/actions/libraryActions';

import { pauseSong } from '../../../store/actions/playerActions';

import Playlist from '../../songsTable/playlistTable/playlistTable';
import Header from '../../header/songsHeader';

import withStatus from '../../../hoc/statusHoc';

class SongsList extends Component {
  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs() {
    if (this.props.recently) {
      this.props.fetchRecentSongs();
    } else {
      this.props.fetchSongs();
    }
  }

  playTracks = (context, offset) => {
    const songs = this.props.songs.slice(offset).map(s => s.track.uri);
    axios.put('/me/player/play', { uris: songs });
  };

  render = () => (
    <div className="player-container">
      <Header
        title={this.props.recently ? 'Recently Played' : 'Songs'}
        playSong={() => this.props.playTracks(null, 0)}
        pauseSong={this.props.pauseSong}
        playing={this.props.playing}
      />
      <Playlist
        songs={this.props.songs}
        playSong={this.playTracks}
        pauseSong={this.props.pauseSong}
        current={this.props.currentSong}
        playing={this.props.playing}
      />
    </div>
  );
}
const mapStateToProps = state => {
  return {
    songs: state.libraryReducer.songs ? state.libraryReducer.songs.items : [],
    user: state.userReducer.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSongs,
      fetchRecentSongs,
      pauseSong
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStatus(SongsList));
