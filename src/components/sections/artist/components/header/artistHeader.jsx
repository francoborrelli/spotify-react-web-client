import React from 'react';

import './artistHeader.css';
import withUserActions from '../../../../../hoc/userHoc';

const artistHeader = ({ artist, followArtist, unfollowArtist }) => (
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
            {artist.follows && (
              <button
                onClick={() => unfollowArtist(artist.id)}
                className="follow-btn following"
              />
            )}
            {!artist.follows && (
              <button
                onClick={() => followArtist(artist.id)}
                className="follow-btn"
              >
                FOLLOW
              </button>
            )}
          </div>
          <div>
            <button className="menu-btn">···</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withUserActions(artistHeader);
