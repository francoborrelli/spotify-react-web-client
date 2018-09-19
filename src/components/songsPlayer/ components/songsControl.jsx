import React from 'react';

import Button from './controlButton';

const songsControl = props => (
  <div className="song-control">
    <Button
      className="back-song"
      icon="fa-step-backward reverse"
      onClick={props.previousSong}
    />
    <Button
      className="play-btn"
      icon={
        'play-btn' + props.playing ? 'fa-pause-circle-o' : 'fa-play-circle-o'
      }
      playBtn
    />
    <Button
      className="next-song"
      icon="fa-step-forward forward"
      onClick={props.nextSong}
    />
  </div>
);

export default songsControl;
