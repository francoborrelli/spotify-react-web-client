import React from 'react';

const index = props => (
  <div className="table-container">
    <div class="search-index">
      <i class="fa fa-flag-o" aria-hidden="true" />
      <h2>{`No results found for "${props.value}"`}</h2>
      <span>
        Please make sure your words are spelled correctly or use less or
        different keywords.
      </span>
    </div>
  </div>
);

export default index;
