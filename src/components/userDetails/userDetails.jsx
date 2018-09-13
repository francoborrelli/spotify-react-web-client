
import React from 'react';

const container = {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 0",
    background: "rgb(24, 24, 24)"
  }
  
  const userImage = {
    borderRadius: "50%",
    height: 30
  }
  
  const userName = {
    color: "#fff",
    fontSize: 14,
    position: "relative",
    top: "-5px",
    marginLeft: 10
  }

const header = props => (
    <div className='details-container' style={container}>
      <img alt='user' className='user-image' style={userImage} src="https://pbs.twimg.com/profile_images/829792458988982274/Jmc0f4Fb_400x400.jpg"/>
      <p className='user-name' style={userName}>Franco Borrelli</p>
    </div>)

export default header;
