import React from 'react';

const item = props => (
  <div>
    <img src={item.images ? item.images[0].url : ''} />
  </div>
);

export default item;
