import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSongs } from '../../store/actions/libraryActions';

import Playlist from '../playlist/playlist';
import Header from '../header/songsHeader';

class SongsList extends Component {
  state = {
    fetch: false
  };

  componentDidUpdate(prevProps) {
    const token = this.props.token;
    console.log(this.props.songs);
    if (token !== '' && !this.state.fetch) {
      this.props.fetchSongs(token);
      this.setState({ fetch: true });
    }
  }

  render = () => (
    <div className="player-container">
      <Header title="Songs" />
      <Playlist songs={this.props.songs || []} />
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
      fetchSongs
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongsList);
