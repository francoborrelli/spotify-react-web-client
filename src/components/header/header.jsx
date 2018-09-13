
import React from 'react';

import UserDetails from '../userDetails/userDetails';
import Search from '../trackSearch/trackSearch';

const style = {
    position: "fixed",
    minWidth: 1200,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    background: "rgb(24, 24, 24)"
}

const header = props => (
<div className="header" style={style}>
      <Search />
      <UserDetails />
    </div>)

export default header;
