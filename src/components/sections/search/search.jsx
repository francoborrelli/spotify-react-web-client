import React, { Component } from 'react';

import Index from './components/index/index';
import NoResults from './components/noResults/noResults';
import './search.css';

class Search extends Component {
  render = () => (
    <div className="search-container">
      <NoResults />
    </div>
  );
}

export default Search;
