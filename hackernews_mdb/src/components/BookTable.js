import React, { Component } from 'react';
import BookList from './BookList';

import { list } from '../data/list';
import Search from './Search';

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
      searchTerm: ''
    };
    this.removeBook = this.removeBook.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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
  render() {
    const { list, searchTerm } = this.state;
    return (
      <div>
        <Search onSearchChange={this.onSearchChange} />
        <hr />
        <BookList
          list={list}
          removeBook={this.removeBook}
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
