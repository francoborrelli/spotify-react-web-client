import React from 'react';

import withUiActions from '../../hoc/uiHoc';

const container = {
  position: 'relative',
  top: '15px'
};

const input = {
  background: '#fff',
  width: 120,
  borderRadius: 10,
  border: 'none',
  fontFamily: "'Proxima Nova', Georgia, sans-serif",
  padding: '4px 4px 4px 10px',
  outline: 'none',
  marginTop: -2
};

const search = props => (
  <div className="track-search-container" style={container}>
    <form>
      <input
        type="text"
        placeholder="Search..."
        style={input}
        onClick={props.onSearch}
      />
    </form>
  </div>
);

export default withUiActions(search);
