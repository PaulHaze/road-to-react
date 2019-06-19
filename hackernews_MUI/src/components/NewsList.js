import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import NewsDetail from './NewsDetail';

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(2),
    overflowX: 'hide',
    minWidth: 340,
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 3,
    paddingLeft: 8,
  },
});


const NewsList = ({ result, removeStory, classes }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>TITLE</TableCell>
          <TableCell className={classes.tableCell} align="left">
            AUTHOR
          </TableCell>
          <TableCell className={classes.tableCell} align="center">
            RATING
          </TableCell>
          <TableCell className={classes.tableCell} align="center">
            <Icon>comment</Icon>
          </TableCell>
          <TableCell className={classes.tableCell} />
        </TableRow>
      </TableHead>
      <TableBody>
        {result
        && result.map(story => (
          <NewsDetail
            key={story.objectID}
            id={story.objectID}
            url={story.url}
            title={story.title}
            author={story.author}
            comments={story.num_comments}
            removeStory={removeStory}
            points={story.points}
          />
        ))}
      </TableBody>
    </Table>
  </Paper>
);

NewsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsList);
