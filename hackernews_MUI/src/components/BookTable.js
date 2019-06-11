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
    const { list } = this.state;
    return (
      <div>
        <BookList list={list} removeBook={this.removeBook} />
        {list.length === 0 && (
          <h1 className="text-center pt-5">Nothing To Display</h1>
        )}
      </div>
    );
  }
}
