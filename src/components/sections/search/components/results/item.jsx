import React from 'react';

import artist from '../../../../../containers/mainSection/images/artist.png';
import playlist from '../../../../../containers/mainSection/images/playlist.png';
import withStatus from '../../../../../hoc/statusHoc';

const item = ({
  item,
  type,
  onClick,
  playSong,
  pauseSong,
  playTracks,
  currentUri,
  currentSong,
  playing
}) => {
  let img, title, description;

  if (type === 'Songs') {
    img = item.album.images[2]
      ? item.album.images[2].url
      : item.album.images[0].url;
    title = item.name;
    description = item.artists.map(i => i.name).join(', ');
  } else {
    img = item.images.length
      ? item.images[2]
        ? item.images[2].url
        : item.images[0].url
      : type === 'Artists'
        ? artist
        : playlist;
    title = item.name;
    description =
      type === 'Albums' ? item.artists.map(i => i.name).join(', ') : null;
  }

  return (
    <ul className={`item ${type === 'Artists' ? 'artist' : ''}`}>
      <div className="image">
        <img alt="song" src={img} />
        {(playing && currentUri === item.uri) || currentSong === item.id ? (
          <i
            className="fa fa-pause-circle-o"
            aria-hidden="true"
            onClick={() => pauseSong()}
          />
        ) : (
          <i
            className="fa fa-play-circle-o"
            aria-hidden="true"
            onClick={() =>
              type === 'Songs' ? playTracks([item.uri], 0) : playSong(item.uri)
            }
          />
        )}
      </div>
      <div
        className="details"
        onClick={() => {
          onClick(item.album ? item.album.id : item.id);
        }}
      >
        <h4>{title}</h4>
        {description && <span>{description}</span>}
      </div>
    </ul>
  );
};

export default withStatus(item);
