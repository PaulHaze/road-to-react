import React, { Component } from 'react';
import NewsList from './NewsList';

import { list } from '../data/list';
import Search from './Search';

// API constants
const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// HOC written outside the component
// returns a function used to filter
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.author.toLowerCase().includes(searchTerm.toLowerCase());

export default class HackerNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.removeStory = this.removeStory.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchApi = this.searchApi.bind(this);
  }
  componentDidMount() {
    this.searchApi();
  }
  searchApi() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
  setSearchTopStories(result) {
    this.setState({
      result
    });
  }
  onSearchChange(term) {
    this.setState({
      searchTerm: term
    });
  }
  removeStory(id) {
    const newHits = this.state.result.hits.filter(x => x.objectID !== id);
    // use spread operator to pass just the updated part
    // of the object
    this.setState({
      result: { ...this.state.result, hits: newHits }
    });
  }
  render() {
    const { result, searchTerm } = this.state;
    // if (!result) {
    //   return null;
    // }
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
            isSearched={isSearched}
          />
        )}
      </div>
    );
  }
}