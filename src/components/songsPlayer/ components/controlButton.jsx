import React from "react";

const defaultStyle = {
    padding: "0 5px",
    color: "rgb(179, 179, 179)",
    cursor: "pointer",
    fontSize: "16px"
}

const playStyle = {
  ...defaultStyle,
  position: "relative",
  top: "-10px",
  fontSize: "40px",
  margin: "0 5px",
}

const button = props =>(    
    <div className={props.className}>
            <i className={"fa " + props.icon} style={props.playBtn ? playStyle : defaultStyle}/>
      </div>)

export default button;