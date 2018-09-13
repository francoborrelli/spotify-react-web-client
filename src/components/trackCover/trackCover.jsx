import React from 'react';

const container = {
  }
  
const trackCover = (props) => {
  return (
    <div className='cover' style={container}>
      <img src={ props.src } style={{width: "100%"}}/>
    </div>
  );
};

export default trackCover;