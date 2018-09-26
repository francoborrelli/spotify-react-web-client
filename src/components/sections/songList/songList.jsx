import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from '../../../axios';

import {
  fetchSongs,
  fetchRecentSongs,
  fetchMoreSongs
} from '../../../store/actions/libraryActions';

import Playlist from '../../songsTable/playlistTable/playlistTable';
import Header from '../../header/songsHeader';
import Spinner from '../../spinner/spinner';

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
    <Spinner section loading={this.props.fetching}>
      <div className="player-container">
        <Header
          title={this.props.recently ? 'Recently Played' : 'Songs'}
          playSong={() => this.playTracks(this.props.songs, 0)}
          pauseSong={this.props.pauseSong}
          playing={this.props.playing}
        />
        <Playlist
          songs={this.props.songs}
          playSong={this.playTracks}
          pauseSong={this.props.pauseSong}
          current={this.props.currentSong}
          playing={this.props.playing}
          more={this.props.next ? true : false}
          fetchMoreSongs={this.props.fetchMoreSongs}
        />
      </div>
    </Spinner>
  );
}
const mapStateToProps = state => {
  return {
    songs: state.libraryReducer.songs ? state.libraryReducer.songs.items : [],
    user: state.userReducer.user.id,
    fetching: state.libraryReducer.fetchSongsPending,
    next: state.libraryReducer.songs ? state.libraryReducer.songs.next : false
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSongs,
      fetchRecentSongs,
      fetchMoreSongs
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStatus(SongsList));
