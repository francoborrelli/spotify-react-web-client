import React from 'react';

import UserDetails from '../userDetails/userDetails';
import Search from '../trackSearch/trackSearch';

const style = {
  position: 'fixed',
  zIndex: 1000,
  display: 'flex',
  width: '62%',
  justifyContent: 'space-between',
  background: 'rgb(24, 24, 24)'
};

const header = props => (
  <div className="header" style={style}>
    <Search />
    <UserDetails
      username="franco borrelli"
      img="https://pbs.twimg.com/profile_images/829792458988982274/Jmc0f4Fb_400x400.jpg"
    />
  </div>
);

export default header;
