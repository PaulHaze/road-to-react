import React, { Component } from 'react';
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
      searchTerm: DEFAULT_QUERY
    };
  }

  componentDidMount = () => {
    this.searchApi();
  };

  searchApi = () => {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  };

  setSearchTopStories = result => {
    this.setState({
      result
    });
  };

  onSearchChange = term => {
    this.setState({
      searchTerm: term
    });
  };

  removeStory = id => {
    const newHits = this.state.result.hits.filter(x => x.objectID !== id);
    this.setState({
      result: { ...this.state.result, hits: newHits }
    });
  };

  render() {
    const { result, searchTerm } = this.state;
    return (
      <div>
        <Search onSearchChange={this.onSearchChange} searchTerm={searchTerm} />
        <hr />
        <h1 className="text-center">Results:</h1>
        {result && (
          <NewsList
            result={result.hits}
            removeStory={this.removeStory}
            searchTerm={searchTerm}
          />
        )}
      </div>
    );
  }
}
