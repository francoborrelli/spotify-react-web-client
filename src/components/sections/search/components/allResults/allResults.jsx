import React from 'react';

import Generic from '../../../top/generic';

const results = props => {
  let type;
  if (props.type === 'Artists') {
    type = 'artist';
  }
  if (props.type === 'Albums') {
    type = 'album';
  }
  if (props.type === 'Playlists') {
    type = 'playlist';
  }

  return (
    <div className="all-results">
      <h2>
        Showing {props.type} for "{props.query}"
      </h2>
      <Generic type={type} url={`/search?q=${props.query}&type=${type}`} />
    </div>
  );
};

export default results;
