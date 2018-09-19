import React, { Component } from 'react';

import '../sections/artist/components/popular/popular.css';

import './albumTable.css';

import Song from '../../components/playlistTable/components/items/song';

class Album extends Component {
  render() {
    return (
      <div className="album-container">
        <div className="song-header-container">
          <div className="song-number-header">
            <p>#</p>
          </div>
          <div className="song-title-header">
            <p>Title</p>
          </div>
          <div className="song-artist-header">
            <p>Artists</p>
          </div>
          <div className="explicit-header" />
          <div className="song-length-header">
            <i className="fa fa-clock-o" aria-hidden="true" />
          </div>
        </div>
        {this.props.tracks.map((t, i) => (
          <Song item={{ track: t }} key={i} index={i} isAlbum={true} />
        ))}
      </div>
    );
  }
}

export default Album;
