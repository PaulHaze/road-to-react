import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import BookDetail from './BookDetail';

const BookList = ({ list, removeBook, isSearched, searchTerm }) => (
  <MDBTable>
    <MDBTableHead>
      <tr className="grey-text">
        <th scope="col">TITLE</th>
        <th scope="col">AUTHOR</th>
        <th className="text-center" scope="col">
          RATING
        </th>
        <th className="text-center" scope="col">
          <i className="fas fa-comment-alt" />
        </th>
        <th scope="col" />
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {list.filter(isSearched(searchTerm)).map(book => (
        <BookDetail
          key={book.objectID}
          id={book.objectID}
          url={book.url}
          title={book.title}
          author={book.author}
          comments={book.num_comments}
          removeBook={removeBook}
          points={book.points}
        />
      ))}
    </MDBTableBody>
  </MDBTable>
);

export default BookList;
