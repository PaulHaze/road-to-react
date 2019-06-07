import React, { Component } from 'react';
import BookList from './BookList';

import { list } from '../data/list';

export default class BookTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list
    };
  }
  removeBook = id => {
    const newList = this.state.list.filter(x => x.objectID !== id);
    this.setState({
      list: newList
    });
  };
  render() {
    return (
      <div>
        <BookList list={this.state.list} removeBook={this.removeBook} />
      </div>
    );
  }
}
