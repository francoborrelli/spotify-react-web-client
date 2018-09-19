import React from 'react';
import moment from 'moment';

import './albums.css';

const albums = ({ album }) => (
  <div className="album-container">
    <div>
      <img alt="album cover" src={album.images[1].url} />
    </div>
    <div className="album-info">
      <span className="album-year">
        {moment(album.release_date).format('YYYY')}
      </span>
      <h1>{album.name}</h1>
    </div>
  </div>
);

export default albums;
