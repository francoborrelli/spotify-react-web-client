import React, { Component } from 'react';

import '../sections/artist/components/popular/popular.css';

import './albumTable.css';

import Song from '../../components/playlistTable/components/items/song';

class Album extends Component {
  groupByCD() {
    return this.props.tracks.reduce((memo, x) => {
      if (!memo[x['disc_number']]) {
        memo[x['disc_number']] = [];
      }
      memo[x['disc_number']].push(x);
      return memo;
    }, []);
  }

  renderTracks() {
    const lastTrack = this.props.tracks[this.props.tracks.length - 1];
    const count = lastTrack ? lastTrack.disc_number : 1;

    if (count > 1) {
      const cds = this.groupByCD();
      return cds.map((cd, i) => (
        <div>
          <div className="cd-header">
            <i className="fa fa-dot-circle-o" />
            {` ${i}`}
          </div>
          {this.renderSimple(cd)}
        </div>
      ));
    }

    return this.renderSimple(this.props.tracks);
  }

  renderSimple = cd =>
    cd.map((t, i) => (
      <Song item={{ track: t }} key={i} index={i + 1} isAlbum={true} />
    ));

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
        {this.renderTracks()}
      </div>
    );
  }
}

export default Album;
