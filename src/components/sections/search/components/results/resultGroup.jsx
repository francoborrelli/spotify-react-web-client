import React from 'react';

import Item from './item';

const resultGroup = ({ items, title, onClick }) => (
  <div className="search-result">
    <div className="result-header">
      <h4>{title}</h4>
      <span>See All</span>
    </div>
    <li className="result-body">
      {items.map((item, i) => (
        <Item key={i} item={item} type={title} onClick={onClick} />
      ))}
    </li>
  </div>
);

export default resultGroup;
