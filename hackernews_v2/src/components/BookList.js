import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// const useStyles = makeStyles(theme => ({
//   button: {
//     // verticalAlign: 'middle'
//   }
// }));

export default function BookList({ list, removeBook }) {
  // const classes = useStyles();
  const handleClick = id => removeBook(id);
  const bookList = list.map(book => (
    <TableRow key={book.objectID}>
      <TableCell component="th" scope="row">
        <span>
          <a href={book.url}> {book.title}</a>
        </span>
      </TableCell>
      <TableCell align="left">{book.author}</TableCell>
      <TableCell align="center">{book.points}/5</TableCell>
      <TableCell align="center">{book.num_comments}</TableCell>
      <TableCell>
        <Button
          onClick={() => handleClick(book.objectID)}
          variant="contained"
          color="secondary"
          size="small"
        >
          <Icon>cancel</Icon>
        </Button>
      </TableCell>
    </TableRow>
  ));

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
      <TableBody>{bookList}</TableBody>
    </Table>
  );
}
