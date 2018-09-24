import React, { Component } from 'react';

import UserDetails from '../userDetails/userDetails';
import Search from '../trackSearch/trackSearch';

import './header.css';

class Header extends Component {
  render = () => (
    <div className="main-header">
      <Search />
      <UserDetails username={this.props.username} img={this.props.img} />
    </div>
  );
}

export default Header;
