import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  removeSong,
  addSong,
  containsSong
} from '../../../store/actions/libraryActions';

export default function(ComposedComponent) {
  class StatusHoc extends Component {
    state = {
      songsStatus: []
    };

    componentDidMount() {
      this.fetchStatus();
    }

    componentDidUpdate(prevProps) {
      if (this.props.songs !== prevProps.songs) {
        this.fetchStatus();
      }
    }

    async fetchStatus() {
      const length = this.state.songsStatus.length;
      const songs = this.props.songs
        .slice(length)
        .map(s => (s.track ? s.track.id : s.id));
      let i, j, temparray;
      for (i = 0, j = songs.length; i < j; i += 25) {
        temparray = songs.slice(i, i + 25);
        await this.props.containsSong(temparray.join(',')).then(response => {
          this.setSongs(response);
        });
      }
    }

    setSongs(songs) {
      this.setState(previousState => {
        return { songsStatus: previousState.songsStatus.concat(songs) };
      });
    }

    changeSongStatus = (index, newState) => {
      const songs = this.state.songsStatus;
      songs[index] = newState;
      this.setState({ songsStatus: songs });
    };

    render = () => (
      <ComposedComponent
        changeSongStatus={this.changeSongStatus}
        songsStatus={this.state.songsStatus}
        {...this.props}
      />
    );
  }

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        removeSong,
        containsSong,
        addSong
      },
      dispatch
    );
  };

  return connect(
    null,
    mapDispatchToProps
  )(StatusHoc);
}
