import React from 'react';
import withStatus from '../../../../../hoc/statusHoc';

const song = props => {
  const active = props.currentSong === props.item.id && props.playing;
  const buttonClass = !active ? 'fa-play-circle-o' : 'fa-pause-circle-o';
  const popularity = Math.round(props.item.popularity / 12.5);
  let str = '|';

  return (
    <li className={'user-song-item' + (active ? ' active' : '')}>
      <div className="play-img">
        <img alt="song-cover" src={props.item.album.images[2].url} />
      </div>
      <div
        className="r-song"
        onClick={!active ? props.playTrack : props.pauseSong}
      >
        <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
        <span>{props.index}</span>
      </div>
      <div className="song-title">
        <p>{props.item.name}</p>
      </div>
      <div className="song-explicit">
        {props.item.explicit ? <div className="explicit">EXPLICIT</div> : null}
      </div>
      <div className="song-popularity">
        <span>{str.repeat(popularity)}</span>
        <span className="darker">{str.repeat(8 - popularity)}</span>
      </div>
    </li>
  );
};

export default withStatus(song);
