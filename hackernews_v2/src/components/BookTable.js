import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import CancelIcon from '@material-ui/icons/CancelPresentation';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  button: {
    verticalAlign: 'middle'
  }
}));

export default function BookList({ list }) {
  const classes = useStyles();
  const bookList = list.map(book => (
    <TableRow key={book.objectId}>
      <TableCell component="th" scope="row">
        {book.title}
      </TableCell>
      <TableCell align="left">{book.author}</TableCell>
      <TableCell align="center">{book.points}/5</TableCell>
      <TableCell align="center">{book.num_comments}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.button}
        >
          <CancelIcon />
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
            <CommentIcon />
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>{bookList}</TableBody>
    </Table>
  );
}
