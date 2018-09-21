import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchSongs,
  fetchRecentSongs
} from '../../../store/actions/libraryActions';

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

  render = () => (
    <div className="player-container">
      <Header title={this.props.recently ? 'Recently Played' : 'Songs'} />
      <Playlist songs={this.props.songs} />
    </div>
  );
}
const mapStateToProps = state => {
  return {
    token: state.tokenReducer.token ? state.tokenReducer.token : '',
    songs: state.libraryReducer.songs ? state.libraryReducer.songs : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSongs,
      fetchRecentSongs
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongsList);
