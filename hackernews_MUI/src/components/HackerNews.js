import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import NewsList from './NewsList';

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
    console.log(this.state.searchString);
    this.setState({
      searchTerm: this.state.searchString
    });
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
      <div>
        <Search
          onSearchChange={this.onSearchChange}
          searchTerm={searchTerm}
          searchString={searchString}
          searchAPI={this.searchAPI}
        />
        <hr />
        <h1 className="text-center">Results:</h1>
        {result && (
          <Grid xs={12}>
            <NewsList
              result={result.hits}
              removeStory={this.removeStory}
              searchTerm={searchTerm}
            />
          </Grid>
        )}
      </div>
    );
  }
}
