import React, { Component } from 'react';

import './browser.css';

import Header from './components/header/browseHeader';
import Categories from './components/categories/categoriesSection';

const options = [
  { name: 'Genres & Moods' },
  { name: 'Charts' },
  { name: 'New Releases' },
  { name: 'Featured' }
];

class Browse extends Component {
  state = {
    active: 'Genres & Moods'
  };

  setActive = option => {
    this.setState({ active: option });
  };

  render = () => (
    <div>
      <Header
        options={options}
        onClick={this.setActive}
        active={this.state.active}
      />
      <h3 className="browse-title">
        {this.state.active ? this.state.active : 'Genres & Moods'}
      </h3>
      <Categories active={this.state.active} setActive={this.setActive} />
    </div>
  );
}

export default Browse;
