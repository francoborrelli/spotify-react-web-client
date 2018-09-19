import React from 'react';
import moment from 'moment';

import './albums.css';
import AlbumTable from '../../../../albumTable/albumTable';

const albums = ({ album }) => (
  <div>
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
    <AlbumTable tracks={[]} />
  </div>
);

export default albums;
