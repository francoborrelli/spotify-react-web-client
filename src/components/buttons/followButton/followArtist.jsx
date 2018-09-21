import React from 'react';

import Button from './followButton';
import withUserActions from '../../../hoc/userHoc';

const followArtistBtn = ({ following, followArtist, unfollowArtist }) => {
  const onClick = following ? unfollowArtist : followArtist;
  return <Button onClick={onClick} following={following} />;
};

export default withUserActions(followArtistBtn);
