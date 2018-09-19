import React, { Component } from 'react';

import Song from './components/song';

class Album extends Component {
  render() {
    return (
      <div>
        <div className="song-header-container">
          <div className="song-title-header">
            <p>#</p>
          </div>
          <div className="song-title-header">
            <p>Title</p>
          </div>
          <div className="explicit" />
          <div className="song-length-header">
            <i className="fa fa-clock-o" aria-hidden="true" />
          </div>
        </div>
        {this.props.tracks.map((t, i) => (
          <Song item={t} key={i} index={i} />
        ))}
      </div>
    );
  }
}

export default Album;
