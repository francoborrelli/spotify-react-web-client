import React from 'react';

const playlist = ({ item, key }) => (
  <li className="category-item" key={key}>
    <div className="category-image playlist">
      <img src={item.icons ? item.icons[0].url : item.images[0].url} />
    </div>
  </li>
);

export default playlist;
