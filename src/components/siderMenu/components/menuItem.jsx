import React from "react";

const item = props => (
  <li
    onClick={props.onClick}
    className={"menu-item" + (props.active ? " active" : "")}
  >
    {props.title}
  </li>
);

export default item;
