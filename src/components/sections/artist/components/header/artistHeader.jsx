import React from 'react';

import './artistHeader.css';

const artistHeader = ({ artist }) => (
  <div>
    <div className="current-artist-header-container">
      <img
        alt="artist"
        className="current-artist-image"
        src={artist.images ? artist.images[0].url : ''}
      />
      <div className="current-artist-info">
        <h3>{artist.name}</h3>
        <div className="btns-section">
          <div>
            <button className="main-pause-play-btn artist-button">
              {'PLAY'}
            </button>
          </div>
          <div>
            <button className="follow-btn">{'Follow'}</button>
          </div>
          <div>
            <button className="menu-btn">···</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default artistHeader;
