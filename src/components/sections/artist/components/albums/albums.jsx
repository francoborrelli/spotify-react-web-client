import React from 'react';

import './albums.css';
import Album from './album';

const albums = ({ albums, singles = false }) => (
  <div>
    <div>
      <p className="albums-title">{singles ? 'Singles and EPs' : 'Albums'}</p>
      <div className="albums-container">
        {albums.map((album, i) => (
          <Album album={album} key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default albums;
