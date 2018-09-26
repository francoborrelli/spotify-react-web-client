import React from 'react';

import withUiActions from '../../../hoc/uiHoc';
import withStatus from '../../../hoc/statusHoc';

const artistName = {
  fontFamily: "'Proxima Thin', Georgia, sans-serif",
  color: '#aaa',
  fontSize: 12
};

const detailsSection = props => {
  const artists = props.artists.length;
  return (
    <div className="details-section">
      <div className="add-remove-section">
        <p
          onClick={() => props.onAlbumClick(props.album)}
          className={
            'song-name' + (props.songName.length > 30 ? ' overflow' : '')
          }
        >
          {props.songName}
        </p>
        {props.contains ? (
          <i
            className="fa fa-check"
            aria-hidden="true"
            onClick={() => props.removeSong(props.ids, true)}
          />
        ) : (
          <i
            className="fa fa-plus"
            aria-hidden="true"
            onClick={() => props.addSong(props.ids, true)}
          />
        )}
      </div>
      <div className="artist-name" style={artistName}>
        {props.artists.map((artist, i) => (
          <span key={i}>
            <span
              className="artist"
              onClick={() => props.onArtistClick(artist.uri.split(':')[2])}
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

export default withUiActions(withStatus(detailsSection));
