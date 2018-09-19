import React from 'react';

import '../../sections/artist/components/popular/popular.css';

const song = props => {
  const buttonClass =
    props.track === props.songId && !props.songPaused
      ? 'fa-play-circle-o'
      : 'fa-pause-circle-o';

  return (
    <li className="user-song-item">
      <div className="r-song">
        <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
        <span>{props.index}</span>
      </div>
      <div className="song-title">
        <p>{props.item.name}</p>
      </div>
      <div className="song-explicit">
        {props.item.explicit ? <div className="explicit">EXPLICIT</div> : null}
      </div>
    </li>
  );
};

export default song;
