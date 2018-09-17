import React from 'react';

import './playlistHeader.css';
import defaultCover from '../../../../../containers/mainSection/images/playlist.png';

const playlistHeader = ({ playlist }) => {
  const img =
    playlist.images && playlist.images.length !== 0
      ? playlist.images[0].url
      : defaultCover;

  const owner = playlist.owner
    ? playlist.owner.display_name || playlist.owner.id
    : '';

  const songs = playlist.tracks ? playlist.tracks.total : '0';

  return (
    <div className="playlist-title-container">
      <div className="playlist-image-container">
        <img className="playlist-image" src={img} />
      </div>
      <div className="playlist-info-container">
        <p className="playlist-text">PLAYLIST</p>
        <h3 className="header-title playlist">{playlist.name}</h3>
        <p className="created-by">
          Created By: <span className="lighter-text">{owner}</span> - {songs}{' '}
          songs
        </p>
        <button className="main-pause-play-btn">
          {true ? 'PLAY' : 'PAUSE'}
        </button>
      </div>
    </div>
  );
};

export default playlistHeader;
