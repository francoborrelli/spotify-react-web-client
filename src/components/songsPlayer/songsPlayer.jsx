import React from "react";

import './songsPlayer.css'

import DetailSection from "./ components/detailsSection";
import SongsControl from "./ components/songsControl";

const songsPlayer = props => (
  <div className="player-container">
    <DetailSection songName="canción" artistName="franco"></DetailSection>
    <SongsControl></SongsControl>
  </div>
);

export default songsPlayer;
