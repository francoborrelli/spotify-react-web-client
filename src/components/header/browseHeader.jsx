import React from 'react';

import './browseHeader.css';

const browseHeader = props => (
  <div className="browse-headers">
    {props.options.map(item => (
      <p
        onClick={() => props.onClick(item.name)}
        key={item.name}
        className={
          (item.name === props.active ? 'active ' : '') +
          (item.keep ? 'keep' : '')
        }
      >
        {item.name}
      </p>
    ))}
  </div>
);

export default browseHeader;
