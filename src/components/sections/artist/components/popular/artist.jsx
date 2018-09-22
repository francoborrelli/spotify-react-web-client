import React from 'react';

const artist = props => (
  <li className="artist-item" onClick={props.onClick}>
    <div className="play-img">
      <img
        alt="artist-cover"
        className="artist-img"
        src={props.artist.images[2].url}
      />
    </div>
    <div>
      <p>{props.artist.name}</p>
    </div>
  </li>
);

export default artist;
