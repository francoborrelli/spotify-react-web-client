import react from 'react';

import './followButton';
import withUserActions from '../../../hoc/userHoc';

const followBtn = ({ following, mode = 'artist' }) => {
  let onFollow, onUnfollow;
  if (mode === 'artist') {
  }

  <button className={'follow-btn ' + (following ? 'following' : '')}>
    {following ? '' : 'FOLLOW'}
  </button>;
};

export default withUserActions(followBtn);
