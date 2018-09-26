import React from 'react';

import ResultsTable from './resultsTable';

const results = props => (
  <div className="all-results">
    <h2>
      Showing {props.type} for {props.query}
    </h2>
    <div>
      <ResultsTable items={props.playlists} />
    </div>
  </div>
);

export default results;
