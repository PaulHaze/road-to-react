import React, { Component } from 'react';
import NewsList from './NewsList';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import Search from './Search';

// API constants
const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

export default class HackerNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchString: '',
      searchTerm: DEFAULT_QUERY
    };
    // this.setSearchTopStories = this.setSearchTopStories.bind(this);
    // this.removeStory = this.removeStory.bind(this);
    // this.onSearchChange = this.onSearchChange.bind(this);
    // this.searchApi = this.searchApi.bind(this);
  }
  componentDidMount = () => {
    this.requestApiSearch();
  };
  requestApiSearch = () => {
    const { searchString } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchString}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  };
  setSearchTopStories = result => {
    this.setState({
      result
    });
  };
  onSearchChange = string => {
    this.setState({
      searchString: string
    });
  };
  searchAPI = () => {
    this.setState({ searchTerm: this.state.searchString });
    this.requestApiSearch();
  };
  removeStory = id => {
    const newHits = this.state.result.hits.filter(x => x.objectID !== id);
    // use spread operator to pass just the updated part
    // of the object
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
              onSearchChange={this.onSearchChange}
              searchTerm={searchTerm}
              searchString={searchString}
              searchAPI={this.searchAPI}
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
