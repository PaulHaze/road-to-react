import React from 'react';
import Icon from '@material-ui/core/Icon/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';

import BookDetail from './BookDetail';

export default function BookList({ list, removeBook }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>TITLE</TableCell>
          <TableCell align="left">AUTHOR</TableCell>
          <TableCell align="center">RATING</TableCell>
          <TableCell align="center">
            <Icon>comment</Icon>
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map(book => (
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
      </TableBody>
    </Table>
  );
}
