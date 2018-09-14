import React from "react";

const button = props =>(    
    <div className={"control-btn " + props.className}>
            <i className={"fa " + props.icon}/>
      </div>)

export default button;