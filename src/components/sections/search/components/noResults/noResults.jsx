import React from 'react';

const noResults = props => (
  <div className="table-container">
    <div className="search-index">
      <i className="fa fa-flag-o" aria-hidden="true" />
      <h2>{`No results found for "${props.query}"`}</h2>
      <span>
        Please make sure your words are spelled correctly or use less or
        different keywords.
      </span>
    </div>
  </div>
);

export default noResults;
