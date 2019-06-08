import React, { Component } from 'react';
import BookList from './BookList';

import { list } from '../data/list';
import Search from './Search';

// API constants
const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// HOC written outside the component
// returns a function used to filter
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.author.toLowerCase().includes(searchTerm.toLowerCase());

export default class BookTable extends Component {
  static defaultProps = {
    list: list
  };
  constructor(props) {
    super(props);
    this.state = {
      list,
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.removeStory = this.removeStory.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  setSearchTopStories(result) {
    this.setState({
      result
    });
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
  onSearchChange(term) {
    this.setState({
      searchTerm: term
    });
  }
  removeBook(id) {
    const newList = this.state.list.filter(x => x.objectID !== id);
    this.setState({
      list: newList
    });
  }
  removeStory(id) {
    const newResults = this.state.result.filter(x => x.hits.objectID !== id);
    this.setState({
      result: newResults
    });
  }
  render() {
    const { list, result, searchTerm } = this.state;
    return (
      <div>
        <Search onSearchChange={this.onSearchChange} searchTerm={searchTerm}>
          Type to filter the results
        </Search>
        <hr />
        <BookList
          result={result}
          list={list}
          removeBook={this.removeBook}
          removeStory={this.removeStory}
          searchTerm={searchTerm}
          isSearched={isSearched}
        />
        {list.length === 0 && (
          <h1 className="text-center pt-5">Nothing To Display</h1>
        )}
      </div>
    );
  }
}
