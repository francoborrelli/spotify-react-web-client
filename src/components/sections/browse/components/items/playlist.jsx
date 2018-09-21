import React from 'react';

const style = {
  marginTop: 0,
  textAlign: 'center'
};

const playlist = ({ item, onClick, chart = false }) => (
  <li className="category-item" onClick={onClick}>
    <div className="category-image playlist">
      <img
        alt="playlist cover"
        src={item.icons ? item.icons[0].url : item.images[0].url}
      />
    </div>
    {chart && (
      <div>
        <p style={style}>{item.name}</p>
      </div>
    )}
  </li>
);

export default playlist;
