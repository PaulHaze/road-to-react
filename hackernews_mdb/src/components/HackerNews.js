import React, { Component } from 'react';
import NewsList from './NewsList';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import Search from './Search';

// API constants
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

export default class HackerNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchString: ''
    };
  }
  componentDidMount = () => {
    this.requestApiSearch();
  };
  requestApiSearch = () => {
    const { searchString } = this.state;
    const searchUrl = searchString
      ? `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchString}`
      : `${PATH_BASE}${PATH_SEARCH}?tags=front_page`;
    fetch(`${searchUrl}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  };
  setSearchTopStories = result => {
    this.setState({
      result
    });
  };
  onSearchChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };
  onSearchSubmit = e => {
    e.preventDefault();
    this.requestApiSearch();
  };
  removeStory = id => {
    const newHits = this.state.result.hits.filter(x => x.objectID !== id);
    this.setState({
      result: { ...this.state.result, hits: newHits }
    });
  };
  render() {
    const { result, searchTerm, searchString } = this.state;
    return (
      <MDBContainer>
        <MDBRow className="py-2">
          <MDBCol md="12">
            <Search
              onChange={this.onSearchChange}
              searchString={searchString}
              onSubmit={this.onSearchSubmit}
            />
            <hr />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12">
            <h1 className="text-center">Results:</h1>
            {result && (
              <NewsList
                result={result.hits}
                removeStory={this.removeStory}
                searchTerm={searchTerm}
              />
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
