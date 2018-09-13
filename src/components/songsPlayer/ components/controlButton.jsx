import React from "react";

const style = {
    padding: "0 5px",
    color: "rgb(179, 179, 179)",
    cursor: "pointer",
    fontSize: "16px"
}

const button = props =>(    
    <div className={props.className}>
            <i className={"fa " + props.icon} style={style}/>
      </div>)

export default button;