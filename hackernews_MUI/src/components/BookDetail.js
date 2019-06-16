import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function BookDetail({
  url,
  id,
  title,
  author,
  points,
  comments,
  removeBook
}) {
  const handleClick = () => removeBook(id);
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <span>
          <a href={url}>{title}</a>
        </span>
      </TableCell>
      <TableCell align="left">{author}</TableCell>
      <TableCell align="center">{points}/5</TableCell>
      <TableCell align="center">{comments}</TableCell>
      <TableCell>
        <Button
          style={{
            maxWidth: '40px',
            maxHeight: '40px',
            minWidth: '30px',
            minHeight: '30px',
            padding: '5px',
            backgroundColor: '#93252d'
          }}
          onClick={handleClick}
          variant="contained"
          color="secondary"
          size="small"
                  >
          <Icon>cancel</Icon>
        </Button>
      </TableCell>
    </TableRow>
  );
}
