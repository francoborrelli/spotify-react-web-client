import React from 'react';

const album = ({ item, key }) => (
  <li className="category-item" key={key}>
    <div className="category-image playlist">
      <img
        alt="album cover"
        src={item.icons ? item.icons[0].url : item.images[0].url}
      />
    </div>
    <p className="album-title">{item.name}</p>
    <p className="album-artist">
      {item.artists ? item.artists.map(a => a.name).join(' , ') : ''}
    </p>
  </li>
);

export default album;
