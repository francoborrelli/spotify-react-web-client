import React from 'react';

import withUiActions from '../../../hoc/uiHoc';

const artistName = {
  fontFamily: "'Proxima Thin', Georgia, sans-serif",
  color: '#aaa',
  fontSize: 12
};

const detailsSection = props => {
  const artists = props.artists.length;
  const song = props.songName.length || 0;
  return (
    <div className="details-section">
      <p
        className={
          'song-name' + (props.songName.length > 40 ? ' overflow' : '')
        }
      >
        {props.songName}
      </p>
      <div className="artist-name" style={artistName}>
        {props.artists.map((artist, i) => (
          <span key={i}>
            <span
              className="artist"
              onClick={() => props.onArtistClick(artist.id)}
            >
              {artist.name}
            </span>
            {i + 1 !== artists ? ', ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
};

export default withUiActions(detailsSection);
