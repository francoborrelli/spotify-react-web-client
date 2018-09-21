import React from 'react';

import withPlayer from '../../hoc/playerHoc';

const trackCover = props => {
  return props.playing ? (
    <div className="cover">
      <img
        alt="cover"
        src={
          props.currentSong.album ? props.currentSong.album.images[1].url : ''
        }
        style={{ width: '100%' }}
      />
    </div>
  ) : null;
};

export default withPlayer(trackCover);
