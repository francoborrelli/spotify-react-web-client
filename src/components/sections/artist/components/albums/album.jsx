import React from 'react';
import moment from 'moment';

import withUiActions from '../../../../../hoc/uiHoc';

import './albums.css';
import AlbumTable from '../../../../songsTable/albumTable/albumTable';

const album = ({ album, onAlbumClick }) => (
  <div>
    <div className="album-container">
      <div>
        <img alt="album cover" src={album.images[1].url} />
      </div>
      <div className="album-info">
        <span className="album-year">
          {moment(album.release_date).format('YYYY')}
        </span>
        <h1 className="album-title" onClick={() => onAlbumClick(album.id)}>
          {album.name}
        </h1>
      </div>
    </div>
    <AlbumTable tracks={[]} />
  </div>
);

export default withUiActions(album);
