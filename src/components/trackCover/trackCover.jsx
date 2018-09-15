import React from 'react';

const trackCover = props => {
  return (
    <div className="cover">
      <img src={props.src} style={{ width: '100%' }} />
    </div>
  );
};

export default trackCover;
