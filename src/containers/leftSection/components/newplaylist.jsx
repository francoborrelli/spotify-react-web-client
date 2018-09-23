import React from 'react';

const button = props => (
  <div className="new-playlist" onClick={() => props.setModal(true)}>
    <i className="fa fa-plus-circle" />
    New Playlist
  </div>
);

export default button;
