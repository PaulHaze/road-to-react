import React from 'react';
import { MDBIcon, MDBBtn } from 'mdbreact';

const Search = ({ onSearchChange, searchString, searchTerm, searchAPI }) => (
  <form
    onSubmit={searchAPI}
    className="input-group md-form form-sm form-1 pl-0"
  >
    <div className="input-group-prepend">
      <span className="input-group-text purple lighten-3" id="basic-text1">
        <MDBIcon className="text-white" icon="" />
      </span>
    </div>
    <input
      onChange={e => onSearchChange(e.target.value)}
      value={searchString}
      className="form-control my-0 py-1"
      type="text"
      placeholder="Search the Hackernews API"
      aria-label="Search"
    />
    <div className="input-group-append">
      <span className="input-group-text purple lighten-3">
        <MDBBtn
          style={{
            maxWidth: '40px',
            maxHeight: '40px',
            minWidth: '30px',
            minHeight: '30px',
            padding: '5px',
            verticalAlign: 'bottom'
          }}
          size="sm"
          color="purple"
          onClick={() => searchAPI()}
        >
          <MDBIcon className="text-white" icon="search" />
        </MDBBtn>
      </span>
      {/* <span className="input-group-text purple lighten-3" id="basic-text1"> */}

      {/* </span> */}
    </div>
    {/* <MDBBtn onClick={() => searchAPI()}>Search</MDBBtn> */}
  </form>
);

export default Search;
