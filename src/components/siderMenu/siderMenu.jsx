import React, { Component } from 'react';

import './siderMenu.css';

import MenuItem from './components/menuItem';

const sectionOne = [{ title: 'Browse' }, { title: 'Radio' }];

const sectionTwo = [
  { title: 'Your Daily Mix' },
  { title: 'Recently Played' },
  { title: 'Songs' },
  { title: 'Albums' },
  { title: 'Artists' },
  { title: 'Stations' },
  { title: 'Local Files' },
  { title: 'Videos' },
  { title: 'Postcasts' }
];

const sectionThree = [
  { title: 'Lollapalooza 2019' },
  { title: 'Roots' },
  { title: 'New Vibes' },
  { title: 'On the Air II' },
  { title: 'On the Air' },
  { title: 'Mix Vol 7' },
  { title: 'Mix Vol 6' }
];

class SiderMenu extends Component {
  state = {
    active: null
  };

  setActive(title) {
    this.setState({ active: title });
  }

  generateItems = items =>
    items.map(item => (
      <MenuItem
        key={item.title}
        title={item.title}
        active={this.state.active === item.title}
        onClick={() => this.setActive(item.title)}
      />
    ));

  render = () => {
    return (
      <ul className="side-menu-container">
        {this.generateItems(sectionOne)}
        <h3 className="library-header">Your Library</h3>
        {this.generateItems(sectionTwo)}
        <div className="user-playlist-container">
          <h3 className="library-header">Playlists</h3>
          {this.generateItems(sectionThree)}
        </div>
      </ul>
    );
  };
}

export default SiderMenu;
