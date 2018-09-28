import React from 'react';
import Artist from '../../../../../containers/mainSection/images/artist.png';

const artist = props => {

  const img =  props.artist.images[2]
  ? props.artist.images[2].url
  : props.artist.images.length
    ? props.artist.images[0].url
    : Artist;

  return (
  <li className="artist-item" onClick={props.onClick}>
    <div className="play-img">
      <img
        alt="artist-cover"
        className="artist-img"
        src={img}
      />
    </div>
    <div>
      <p>{props.artist.name}</p>
    </div>
  </li>
)};

export default artist;
