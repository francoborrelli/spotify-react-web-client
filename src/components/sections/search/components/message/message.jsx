import React from 'react';

const message = ({ icon, title, description }) => (
  <div className="table-container">
    <div className="search-index">
      <i className={`fa fa-search ${icon}`} aria-hidden="true" />
      <h2>{title}</h2>
      <span>{description}</span>
    </div>
  </div>
);

export default message;
