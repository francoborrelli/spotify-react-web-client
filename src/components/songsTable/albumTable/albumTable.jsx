import React, { Component } from 'react';

import '../../sections/artist/components/popular/popular.css';
import './albumTable.css';

import Song from '../items/song';
import withSongsStatus from '../hoc/songHoc';

class Album extends Component {
  groupByCD() {
    return this.props.songs.reduce((memo, x) => {
      if (!memo[x['disc_number']]) {
        memo[x['disc_number']] = [];
      }
      memo[x['disc_number']].push(x);
      return memo;
    }, []);
  }

  renderTracks() {
    const lastTrack = this.props.songs[this.props.songs.length - 1];
    const count = lastTrack ? lastTrack.disc_number : 1;

    if (count > 1) {
      const cds = this.groupByCD();

      const index = this.props.songs.map(t => t.id);

      return cds.map((cd, i) => (
        <div key={i}>
          <div className="cd-header">
            <i className="fa fa-dot-circle-o" />
            {` ${i}`}
          </div>
          {this.renderSimple(cd, index)}
        </div>
      ));
    }

    return this.renderSimple(this.props.songs);
  }

  renderSimple = (cd, index = null) =>
    cd.map((t, i) => (
      <Song
        contains={this.props.songsStatus[i]}
        item={t}
        key={i}
        index={i + 1}
        isAlbum={true}
        offset={index ? index.indexOf(t.id) : i}
        uri={this.props.uri}
        id={t.id}
        current={this.props.currentSong}
        playing={this.props.playing}
        pauseSong={this.props.pauseSong}
        playSong={this.props.playSong}
        onAdd={() => {
          this.props.changeSongStatus(i, true);
          this.props.addSong(t.id);
        }}
        onDelete={() => {
          this.props.changeSongStatus(i, false);
          this.props.removeSong(t.id);
        }}
      />
    ));

  render() {
    return (
      <div className="album-container">
        <div className="song-header-container">
          <div className="song-number-header">
            <p>#</p>
          </div>{' '}
          <div className="song-number-header" />
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

export default withSongsStatus(Album);
