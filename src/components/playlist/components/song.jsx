import React from 'react';
import moment from 'moment';

const msToMinutesAndSeconds = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

const song = props => {
  const buttonClass =
    props.track === props.songId && !props.songPaused
      ? 'fa-pause-circle-o'
      : 'fa-play-circle-o';

  return (
    <li key={20} className="user-song-item">
      <div className="play-song">
        <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
      </div>
      <div className="song-title">
        <p>Shape of You</p>
      </div>
      <div className="song-artist">
        <p>Ed Sheeran</p>
      </div>
      <div className="song-album">
        <p>%</p>
      </div>
      <div className="song-added">
        <p>{moment().format('YYYY-MM-DD')}</p>
      </div>
      <div className="song-length">
        <p>{msToMinutesAndSeconds(6000)}</p>
      </div>
    </li>
  );
};

export default song;
