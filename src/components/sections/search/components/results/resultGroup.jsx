import React from 'react';

import Item from './item';

const resultGroup = ({ items, type, onClick, changeMode }) => (
  <div className="search-result">
    <div className="result-header">
      <h4>{type}</h4>
      <span onClick={() => changeMode(type)}>See All</span>
    </div>
    <li className="result-body">
      {items.map((item, i) => (
        <Item key={i} item={item} type={type} onClick={onClick} />
      ))}
    </li>
  </div>
);

export default resultGroup;
