import React from 'react';

import withPlayer from '../../hoc/playerHoc';

const trackCover = props => {
  return props.currentSong.album ? (
    <div className="cover">
      <img
        alt="cover"
        src={
          props.currentSong.album ? props.currentSong.album.images[2].url : ''
        }
        style={{ width: '100%' }}
      />
    </div>
  ) : null;
};

export default withPlayer(trackCover);
