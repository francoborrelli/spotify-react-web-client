import React from 'react';

import './songsHeader.css';

const simpleHeader = props => (
  <div>
    <h3 className="header-title">{props.title}</h3>
    <button
      onClick={props.playing ? props.pauseSong : props.playSong}
      className="main-pause-play-btn"
    >
      {props.playing ? 'PAUSE' : 'PLAY'}
    </button>
  </div>
);

export default simpleHeader;
