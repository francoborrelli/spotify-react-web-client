import React from 'react';

import './followButton.css';

const btn = ({ following, onClick }) => (
  <button
    onClick={onClick}
    className={'follow-btn ' + (following ? 'following' : '')}
  >
    {following ? '' : 'FOLLOW'}
  </button>
);

export default btn;
