import React from 'react';

import './siderMenu.css';

import MenuItem from './components/menuItem';

const sectionOne = [{ title: 'Browse' }, { title: 'Radio', active: true }];

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

const elementsSOne = sectionOne.map(item => (
  <MenuItem key={item.title} title={item.title} active={item.active} />
));
const elementsSTwo = sectionTwo.map(item => (
  <MenuItem key={item.title} title={item.title} active={item.active} />
));
const elementsSThree = sectionThree.map(item => (
  <MenuItem key={item.title} title={item.title} active={item.active} />
));

const siderMenu = props => (
  <ul className="side-menu-container">
    {elementsSOne}
    <h3 className="library-header">Your Library</h3>
    {elementsSTwo}
    <div className="user-playlist-container">
      <h3 className="library-header">Playlists</h3>
      {elementsSThree}
    </div>
  </ul>
);

export default siderMenu;
