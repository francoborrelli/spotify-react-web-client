import React from 'react';

const playlist = ({ item, key, onClick }) => (
  <li className="category-item" key={key} onClick={onClick}>
    <div className="category-image playlist">
      <img
        alt="playlist cover"
        src={item.icons ? item.icons[0].url : item.images[0].url}
      />
    </div>
  </li>
);

export default playlist;
