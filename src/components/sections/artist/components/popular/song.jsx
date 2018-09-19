import React from 'react';
import moment from 'moment';

const song = props => {
  const buttonClass =
    props.track === props.songId && !props.songPaused
      ? 'fa-play-circle-o'
      : 'fa-pause-circle-o';

  return (
    <li className="user-song-item">
      <div className="play-img">
        <img src={props.item.album.images[2].url} />
      </div>
      <div className="r-song">
        <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
        <span>{props.index}</span>
      </div>
      <div className="song-title">
        <p>{props.item.name}</p>
      </div>
      {props.item.explicit ? (
        <div className="song-explicit">
          <div className="explicit">explicit</div>
        </div>
      ) : null}
    </li>
  );
};

export default song;
