import React from 'react';

import withUiActions from '../../../hoc/uiChange';

const songDetails = {
  position: 'absolute',
  left: 20,
  top: 14,
  lineHeight: '5px',
  cursor: 'default'
};

const songName = {
  fontFamily: "'Proxima Nova', Georgia, sans-serif",
  color: '#fff',
  fontSize: 14
};

const artistName = {
  fontFamily: "'Proxima Thin', Georgia, sans-serif",
  color: '#aaa',
  fontSize: 12
};

const detailsSection = props => (
  <div className="details-section" style={songDetails}>
    <p className="song-name" style={songName}>
      {props.songName}
    </p>
    <div className="artist-name" style={artistName}>
      {props.artists.map((artist, i) => (
        <span key={i} onClick={() => props.onArtistClick(artist.id)}>
          {artist.name}
        </span>
      ))}
    </div>
  </div>
);

export default withUiActions(detailsSection);
