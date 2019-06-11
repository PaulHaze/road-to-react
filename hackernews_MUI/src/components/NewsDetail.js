import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const NewsDetail = ({
  url,
  id,
  title,
  author,
  points,
  comments,
  removeStory
}) => (
  <TableRow>
    <TableCell component="th" scope="row">
      <span>
        <a href={url} target="blank">
          {title}
        </a>
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
        onClick={() => removeStory(id)}
        variant="contained"
        color="secondary"
        size="small"
      >
        <Icon>cancel</Icon>
      </Button>
    </TableCell>
  </TableRow>
);

export default NewsDetail;
