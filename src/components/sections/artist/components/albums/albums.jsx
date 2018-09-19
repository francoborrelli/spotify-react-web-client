import React from 'react';

import './albums.css';
import Album from './album';

const albums = ({ albums }) => (
  <div>
    <div>
      <p className="albums-title">Albums</p>
      {albums.map((album, i) => (
        <Album album={album} key={i} />
      ))}
    </div>
  </div>
);

export default albums;
