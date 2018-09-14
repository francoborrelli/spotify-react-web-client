import React from "react";

const item = props => <li className={'menu-item' + (props.active ? ' active' : '')}>{props.title}</li>

export default item;