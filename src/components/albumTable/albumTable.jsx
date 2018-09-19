import React, { Component } from 'react';

class Album extends Component {
  render() {
    return this.props.title ? (
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
          <Song item={item} key={item.track.id} />
        ))}
      </div>
    ) : null;
  }
}

export default Album;
