import React from 'react';
import { MDBIcon } from 'mdbreact';

const Search = ({ onSearchChange, searchTerm, children }) => (
  <div className="input-group md-form form-sm form-1 pl-0">
    <div className="input-group-prepend">
      <span className="input-group-text purple lighten-3" id="basic-text1">
        <MDBIcon className="text-white" icon="search" />
      </span>
    </div>
    <input
      onChange={e => onSearchChange(e.target.value)}
      value={searchTerm}
      className="form-control my-0 py-1"
      type="text"
      placeholder={children}
      aria-label="Search"
    />
  </div>
);

export default Search;
