import React from "react";

import Button from "./controlButton";

const songsControl = props => (    
<div className="song-control">
      <Button className="back-song" icon="fa-step-backward reverse"/>
      <Button className="play-btn" icon="fa-play-circle-o play-btn" playBtn/>
      <Button className="next-song" icon="fa-step-forward forward"/>
</div>)

export default songsControl;