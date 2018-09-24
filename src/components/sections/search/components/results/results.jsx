import React from 'react';

import withUiActions from '../../../../../hoc/uiHoc';

import ResultGroup from './resultGroup';
const results = ({
  songs,
  artists,
  albums,
  playlists,
  onAlbumClick,
  onArtistClick,
  onPlaylistClick
}) => (
  <div className="table-container">
    <div className="results-table">
      <div className="search-results">
        {songs.length ? (
          <ResultGroup items={songs} onClick={onAlbumClick} title="Songs" />
        ) : null}
        {artists.length ? (
          <ResultGroup
            items={artists}
            onClick={onArtistClick}
            title="Artists"
          />
        ) : null}
        {albums.length ? (
          <ResultGroup items={albums} onClick={onAlbumClick} title="Albums" />
        ) : null}
        {playlists.length ? (
          <ResultGroup
            items={playlists}
            onClick={onPlaylistClick}
            title="Playlists"
          />
        ) : null}
      </div>
    </div>
  </div>
);

export default withUiActions(results);
