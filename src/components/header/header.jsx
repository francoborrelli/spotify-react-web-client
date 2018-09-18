import React, { Component } from 'react';

import UserDetails from '../userDetails/userDetails';
import Search from '../trackSearch/trackSearch';

const style = {
  position: 'fixed',
  zIndex: 1000,
  display: 'flex',
  height: 50,
  justifyContent: 'space-between',
  background: 'rgb(24, 24, 24)'
};

class Header extends Component {
  state = {
    width: '100%'
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const width = document.getElementsByClassName('main-section-container')[0]
      .offsetWidth;
    this.setState({ width: width });
  };

  render = () => (
    <div className="header" style={{ ...style, width: this.state.width }}>
      <Search />
      <UserDetails username={this.props.username} img={this.props.img} />
    </div>
  );
}

export default Header;
