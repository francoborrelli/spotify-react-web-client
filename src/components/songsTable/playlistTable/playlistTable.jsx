import React from 'react';

import './playlistTable.css';

import Song from '../items/song';
import EmptySection from './components/emptySection/empty';

const playlistTable = props => {
  return props.songs.length === 0 ? (
    <EmptySection />
  ) : (
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
      {props.songs.map((item, i) => (
        <Song
          item={item}
          key={item.track.id}
          uri={props.uri}
          offset={i}
          current={props.current}
          playing={props.playing}
          pauseSong={props.pauseSong}
          playSong={props.playSong}
        />
      ))}
    </div>
  );
};

export default playlistTable;
