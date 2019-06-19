import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  tableCell: {
    paddingRight: 4,
    paddingLeft: 8,
  },
});

const NewsDetail = ({
  url,
  id,
  title,
  author,
  points,
  comments,
  removeStory,
  classes,
}) => (
  <TableRow>
    <TableCell className={classes.tableCell} component="th" scope="row">
      <span>
        <a href={url} target="blank">
          {title}
        </a>
      </span>
    </TableCell>
    <TableCell className={classes.tableCell} align="left">
      {author}
    </TableCell>
    <TableCell className={classes.tableCell} align="center">
      {points}
    </TableCell>
    <TableCell className={classes.tableCell} align="center">
      {comments}
    </TableCell>
    <TableCell className={classes.tableCell}>
      <Button
        style={{
          maxWidth: '40px',
          maxHeight: '40px',
          minWidth: '20px',
          minHeight: '20px',
          padding: '5px',
          backgroundColor: '#93252d',
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

// NewsDetail.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(NewsDetail);
