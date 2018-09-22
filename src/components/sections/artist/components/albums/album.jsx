import React from 'react';
import moment from 'moment';

import withUiActions from '../../../../../hoc/uiHoc';

import './albums.css';

const album = ({ album, onAlbumClick }) => (
  <div className="album" onClick={() => onAlbumClick(album.id)}>
    <div>
      <img alt="album cover" src={album.images[1].url} />
    </div>
    <div className="album-info">
      <h4 className="album-title">{album.name}</h4>
      <span className="album-year">
        {moment(album.release_date).format('YYYY')}
      </span>
    </div>
  </div>
);

export default withUiActions(album);
