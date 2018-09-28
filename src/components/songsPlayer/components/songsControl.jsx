import React from 'react';

import Button from './controlButton';

const songsControl = props => (
  <div className="song-control">
    <Button
      onClick={() => props.shuffle(!props.shuffleActive)}
      className={'shuffle-song' + (props.shuffleActive ? ' active' : '')}
      icon="fa-random"
    />
    <Button
      className="back-song"
      icon="fa-step-backward reverse"
      onClick={props.previousSong}
    />
    <Button
      className="play-btn"
      onClick={props.playing ? props.pauseSong : props.playSong}
      icon={
        'play-btn ' + (props.playing ? 'fa-pause-circle-o' : 'fa-play-circle-o')
      }
      playBtn
    />
    <Button
      className="next-song"
      icon="fa-step-forward forward"
      onClick={props.nextSong}
    />
    <Button
      onClick={() =>
        props.repeatContext(props.repeatActive ? 'off' : 'context')
      }
      className={'repeat-song' + (props.repeatActive ? ' active' : '')}
      icon="fa-retweet"
    />
  </div>
);

export default songsControl;
