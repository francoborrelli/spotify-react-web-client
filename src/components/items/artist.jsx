import React from 'react';
import artistImg from '../../containers/mainSection/images/artist.png';

const imgStyle = {
  height: 200,
  width: 200,
  borderRadius: '100px'
};

const style = {
  textAlign: 'center'
};

const artist = ({ item, onClick }) => {
  return (
    <li
      className="category-item artist"
      onClick={() => onClick(item.id)}
      style={style}
    >
      <img
        className="category-image playlist"
        src={item.images.length ? item.images[0].url : artistImg}
        alt={item.name}
        style={imgStyle}
      />
      <p className="name">{item.name}</p>
      <p className="followers">{item.followers.total} FOLLOWERS</p>
    </li>
  );
};

export default artist;
