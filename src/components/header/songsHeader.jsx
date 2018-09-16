import React from 'react';

import './songsHeader.css';

const simpleHeader = props => (
  <div>
    <h3 className="header-title">{props.title}</h3>
    <button className="main-pause-play-btn">{true ? 'PLAY' : 'PAUSE'}</button>
  </div>
);

export default simpleHeader;
