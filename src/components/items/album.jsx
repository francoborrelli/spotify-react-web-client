import React from 'react';

const album = ({ item, onArtistClick, onClick }) => {
  const artists = item.artists ? item.artists.length : 0;

  return (
    <li className="category-item">
      <div className="category-image playlist" onClick={() => onClick(item.id)}>
        <img
          alt="album cover"
          src={item.icons ? item.icons[0].url : item.images[0].url}
        />
      </div>
      <p className="album-title" onClick={() => onClick(item.id)}>
        {item.name}
      </p>
      <p className="album-artists">
        {item.artists
          ? item.artists.map((a, i) => (
              <span key={i}>
                <span
                  className="album-artist"
                  onClick={() => onArtistClick(a.id)}
                >
                  {a.name}
                </span>
                {artists !== i + 1 ? <span>, </span> : null}
              </span>
            ))
          : ''}
      </p>
    </li>
  );
};

export default album;
