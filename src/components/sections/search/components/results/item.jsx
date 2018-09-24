import React from 'react';

import artist from '../../../../../containers/mainSection/images/artist.png';
import playlist from '../../../../../containers/mainSection/images/playlist.png';

const item = ({ item, type, onClick }) => {
  let img, title, description;

  switch (true) {
    case type === 'Songs':
      img = item.album.images[2]
        ? item.album.images[2].url
        : item.album.images[0].url;
      title = item.name;
      description = item.artists.map(i => i.name).join(', ');
      break;
    default:
      img = item.images.length
        ? item.images[2]
          ? item.images[2].url
          : item.images[0].url
        : type === 'Artists'
          ? artist
          : playlist;
      title = item.name;
      description =
        type === 'Albums' ? item.artists.map(i => i.name).join(', ') : null;
  }

  return (
    <ul className={`item ${type === 'Artists' ? 'artist' : ''}`}>
      <div className="image">
        <img alt="song" src={img} />
        <i className="fa fa-play-circle-o" aria-hidden="true" />
      </div>
      <div
        className="details"
        onClick={() => {
          onClick(item.id);
        }}
      >
        <h4>{title}</h4>
        {description && <span>{description}</span>}
      </div>
    </ul>
  );
};

export default item;
