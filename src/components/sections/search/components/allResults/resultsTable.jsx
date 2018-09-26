import React from 'react';

import Item from './item';

const table = props => (
  <div className="results-table-container">
    <div className="results-table" />
    {props.items.map(i => (
      <Item item={i} />
    ))}
  </div>
);

export default table;
