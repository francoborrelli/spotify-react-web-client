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

  playTracks = (context, offset) => {
    const songs = this.state.items.slice(offset).map(s => s.uri);
    axios.put('/me/player/play', { uris: songs });
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
            fetchMoreSongs={this.fetchMore}
            playSong={this.playTracks}
            pauseSong={this.props.pauseSong}
            current={this.props.currentSong}
            playing={this.props.playing}
            more={this.state.next ? true : false}
            songs={this.state.items}
          />
        </Spinner>
      </div>
    );
  };
}

export default withStatus(SongsSearcher);
