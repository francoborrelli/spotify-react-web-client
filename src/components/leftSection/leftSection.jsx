import React from 'react';

import SiderMenu from "../siderMenu/siderMenu";
import TrackCover from "../trackCover/trackCover";


const buttomSection = {
    textAlign: "center",
    width: 190,
    position: "fixed",
    bottom: "75px"
}

const newPlaylist  = {
    height: 40,
    paddingTop: 20,
    color: "rgb(179, 179, 179)",
    backgroundColor: "#0e0e10",
    borderTop: "1px solid rgb(44, 44, 44)"
}


const leftSection = props => (
<div className="left-section" style={{backgroundColor: "#0e0e10"}}>
    <SiderMenu></SiderMenu>
    <div style={buttomSection}>
        <div style={newPlaylist} className="new-playlist">
            <i className="fa fa-plus-circle" style={{paddingRight: 5}}></i>
            New Playlist
        </div>
        <TrackCover src="https://upload.wikimedia.org/wikipedia/en/1/1d/5_-_box_set_by_Ed_Sheeran.jpg"></TrackCover>
    </div>
    </div>)

export default leftSection;
