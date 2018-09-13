import React from "react";

import Button from "./controlButton";

const style = {
      justifyContent: "center",
      display: "flex",
      marginTop: 20,
}

const songsControl = props => (    
<div className="song-controls" style={style}>
      <Button className="back-song" icon="fa-step-backward reverse"/>
      <Button className="play-btn" icon="fa-play-circle-o play-btn"/>
      <Button className="next-song" icon="fa-step-forward forward"/>
</div>)

export default songsControl;