import React, { Component } from 'react';

import axios from '../../../../../axios';
import Spinner from '../../../../spinner/spinner';

import withStatus from '../../../../../hoc/statusHoc';
import PlaylistTable from '../../../../songsTable/playlistTable/playlistTable';

class SongsSearcher extends Component {
  state = {
    items: [],
    fetching: true
  };

  componentDidMount() {
    axios.get(`/search?q=${this.props.query}&type=track`).then(response => {
      this.setState({
        fetching: false,
        items: response.data.tracks.items,
        next: response.data.tracks.next
      });
    });
  }

  fetchMore = () => {
    if (this.state.next) {
      axios.get(this.state.next).then(response => {
        this.setState(prevState => {
          return {
            items: [...prevState.items, ...response.data.tracks.items],
            next: response.data.tracks.next
          };
        });
      });
    }
  };

  render = () => {
    return (
      <div className="generic-container">
        <Spinner section loading={this.state.fetching}>
          <PlaylistTable
            removeDate={true}
            current={this.props.currentSong}
            playing={this.props.playing}
            more={this.state.next ? true : false}
            fetchMoreSongs={this.fetchMore}
            songs={this.state.items}
            pauseSong={this.props.pauseSong}
            playSong={this.props.playSong}
          />
        </Spinner>
      </div>
    );
  };
}

export default withStatus(SongsSearcher);
