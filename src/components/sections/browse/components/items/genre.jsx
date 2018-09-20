import React from 'react';

const genre = ({ item, onClick }) => (
  <li className="category-item" onClick={onClick}>
    <div className="category-image">
      <img
        alt="genre cover"
        src={item.icons ? item.icons[0].url : item.images[0].url}
      />
      <p className="category-name">{item.name}</p>
    </div>
  </li>
);

export default genre;
