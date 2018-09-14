import React from "react";

const songDetails = {
    position: "absolute",
    left: 20,
    top: 14,
    lineHeight: "5px",
  }

const songName = {
    fontFamily: "'Proxima Nova', Georgia, sans-serif",
    color: "#fff",
    fontSize: 14,
  }
  

const artistName = {
    fontFamily: "'Proxima Thin', Georgia, sans-serif",
    color: "#aaa",
    fontSize: 12,
  }

const detailsSection = props => (    
<div className="details-section" style={songDetails}>
    <p className="song-name" style={songName}>{props.songName}</p>
    <p className="artist-name" style={artistName}>{props.artistName}</p>
</div>)

export default detailsSection;