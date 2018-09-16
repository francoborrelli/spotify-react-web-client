import React, { Component } from 'react';

import './playlist.css';

import Song from './components/song';

class Playlist extends Component {
  renderSongs() {
    this.props.songs.map(item => <Song item={item} />);
  }

  render() {
    return (
      <div>
        <div className="song-header-container">
          <div className="song-title-header">
            <p>Title</p>
          </div>
          <div className="song-artist-header">
            <p>Artist</p>
          </div>
          <div className="song-album-header">
            <p>Album</p>
          </div>
          <div className="song-added-header">
            <i className="fa fa-calendar-plus-o" aria-hidden="true" />
          </div>
          <div className="song-length-header">
            <i className="fa fa-clock-o" aria-hidden="true" />
          </div>
        </div>
        {this.props.songs.map(item => (
          <Song item={item} />
        ))}
      </div>
    );
  }
}

export default Playlist;
